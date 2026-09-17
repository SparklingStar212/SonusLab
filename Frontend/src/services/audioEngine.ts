import * as Tone from "tone";

// 1. Create a polyphonic synth and route it to the master output
const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "triangle" },
  envelope: { attack: 0.05, decay: 0.2, sustain: 0.4, release: 1.5 },
}).toDestination();

// Lower the master volume slightly so it doesn't overpower your guitar
Tone.Destination.volume.value = -12;

// 2. Helper to convert our theory strings ("C", "m") into playable frequencies (["C4", "Eb4", "G4"])
const getNotesForChord = (root: string, quality: string): string[] => {
  const scale = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const rootIndex = scale.indexOf(root);

  if (rootIndex === -1) return ["C4", "E4", "G4"]; // Safe fallback

  // Helper to calculate intervals and bump the octave if we cross B -> C
  const getNote = (semitones: number) => {
    const index = (rootIndex + semitones) % 12;
    const octave = rootIndex + semitones >= 12 ? 5 : 4;
    return `${scale[index]}${octave}`;
  };

  // Map the qualities to their respective semitone intervals from the root
  if (quality === "m") return [getNote(0), getNote(3), getNote(7)];
  if (quality === "dim") return [getNote(0), getNote(3), getNote(6)];
  if (quality === "maj7")
    return [getNote(0), getNote(4), getNote(7), getNote(11)];
  if (quality === "m7")
    return [getNote(0), getNote(3), getNote(7), getNote(10)];
  if (quality === "7") return [getNote(0), getNote(4), getNote(7), getNote(10)];
  if (quality === "sus4") return [getNote(0), getNote(5), getNote(7)];
  if (quality === "m7b5")
    return [getNote(0), getNote(3), getNote(6), getNote(10)];

  // Default to standard Major triad: 0, 4, 7
  return [getNote(0), getNote(4), getNote(7)];
};

// 3. Export the engine methods
export const audioEngine = {
  // NEW: Set the global BPM based on the workspace header
  setBpm: (bpm: number) => {
    Tone.Transport.bpm.value = bpm;
  },

  // NEW: The core sequencer logic
  // NEW: Notice the onTick callback we added here
  playProgression: async (
    chords: { root: string; quality: string }[],
    bpm: number,
    onTick?: (index: number) => void, // <-- Pass UI updates through here
  ) => {
    await Tone.start();
    Tone.Transport.stop();
    Tone.Transport.cancel();

    audioEngine.setBpm(bpm);

    // Include the index in our sequence data so we know which block is playing
    const sequenceData = chords.map((chord, index) => ({
      time: `${index}m`,
      index: index, // <-- Track the index
      notes: getNotesForChord(chord.root, chord.quality),
    }));

    const part = new Tone.Part((time, value) => {
      synth.triggerAttackRelease(value.notes, "1m", time);

      // Tone.Draw safely pushes the update to React at the exact millisecond the chord plays
      if (onTick) {
        Tone.Draw.schedule(() => {
          onTick(value.index);
        }, time);
      }
    }, sequenceData).start(0);

    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = `${chords.length}m`;

    Tone.Transport.start();
  },

  // NEW: Stop playback
  stop: () => {
    Tone.Transport.stop();
    Tone.Transport.cancel();
  },

  // Browsers require a user interaction (like a click) before audio can play
  init: async () => {
    await Tone.start();
    console.log("Studio audio context unlocked");
  },

  // Play a single chord instantly (used when tapping chords in the UI palette)
  playChord: (root: string, quality: string) => {
    const notes = getNotesForChord(root, quality);
    synth.triggerAttackRelease(notes, "2n");
  },
};
