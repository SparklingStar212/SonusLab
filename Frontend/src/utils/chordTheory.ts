export interface ChordDef {
  root: string;
  quality: string; // '', 'm', 'dim', 'maj7', 'm7', '7', etc.
}

// A dictionary of diatonic chords for the most common songwriting keys
const DIATONIC_MAP: Record<string, ChordDef[]> = {
  // Major Keys
  "C Major": [
    { root: "C", quality: "" },
    { root: "D", quality: "m" },
    { root: "E", quality: "m" },
    { root: "F", quality: "" },
    { root: "G", quality: "" },
    { root: "A", quality: "m" },
    { root: "B", quality: "dim" },
  ],
  "G Major": [
    { root: "G", quality: "" },
    { root: "A", quality: "m" },
    { root: "B", quality: "m" },
    { root: "C", quality: "" },
    { root: "D", quality: "" },
    { root: "E", quality: "m" },
    { root: "F#", quality: "dim" },
  ],
  "D Major": [
    { root: "D", quality: "" },
    { root: "E", quality: "m" },
    { root: "F#", quality: "m" },
    { root: "G", quality: "" },
    { root: "A", quality: "" },
    { root: "B", quality: "m" },
    { root: "C#", quality: "dim" },
  ],
  "A Major": [
    { root: "A", quality: "" },
    { root: "B", quality: "m" },
    { root: "C#", quality: "m" },
    { root: "D", quality: "" },
    { root: "E", quality: "" },
    { root: "F#", quality: "m" },
    { root: "G#", quality: "dim" },
  ],
  "E Major": [
    { root: "E", quality: "" },
    { root: "F#", quality: "m" },
    { root: "G#", quality: "m" },
    { root: "A", quality: "" },
    { root: "B", quality: "" },
    { root: "C#", quality: "m" },
    { root: "D#", quality: "dim" },
  ],
  "F Major": [
    { root: "F", quality: "" },
    { root: "G", quality: "m" },
    { root: "A", quality: "m" },
    { root: "Bb", quality: "" },
    { root: "C", quality: "" },
    { root: "D", quality: "m" },
    { root: "E", quality: "dim" },
  ],
  // Minor Keys
  "A Minor": [
    { root: "A", quality: "m" },
    { root: "B", quality: "dim" },
    { root: "C", quality: "" },
    { root: "D", quality: "m" },
    { root: "E", quality: "m" },
    { root: "F", quality: "" },
    { root: "G", quality: "" },
  ],
  "E Minor": [
    { root: "E", quality: "m" },
    { root: "F#", quality: "dim" },
    { root: "G", quality: "" },
    { root: "A", quality: "m" },
    { root: "B", quality: "m" },
    { root: "C", quality: "" },
    { root: "D", quality: "" },
  ],
  "B Minor": [
    { root: "B", quality: "m" },
    { root: "C#", quality: "dim" },
    { root: "D", quality: "" },
    { root: "E", quality: "m" },
    { root: "F#", quality: "m" },
    { root: "G", quality: "" },
    { root: "A", quality: "" },
  ],
};

/**
 * Given a key string (like "C Major"), returns the diatonic chords.
 * Falls back to C Major if the key isn't explicitly defined above.
 */
export const getChordsForKey = (keyName: string): ChordDef[] => {
  return DIATONIC_MAP[keyName] || DIATONIC_MAP["C Major"];
};

/**
 * Generates common chord extensions/variations for a given root chord.
 */
export const getChordExtensions = (chord: ChordDef): ChordDef[] => {
  if (chord.quality === "")
    return [
      { root: chord.root, quality: "maj7" },
      { root: chord.root, quality: "7" },
      { root: chord.root, quality: "sus4" },
    ];
  if (chord.quality === "m")
    return [
      { root: chord.root, quality: "m7" },
      { root: chord.root, quality: "m9" },
    ];
  if (chord.quality === "dim") return [{ root: chord.root, quality: "m7b5" }];
  return [];
};
