export interface Section {
  _id?: string;
  type:
    | "Intro"
    | "Verse"
    | "Pre-Chorus"
    | "Chorus"
    | "Bridge"
    | "Outro"
    | "Idea";
  content: string;
  order: number;
}

// New Chord Interface for V2
export interface Chord {
  _id?: string;
  root: string; // e.g., 'C', 'F#', 'Bb'
  quality: string; // e.g., 'maj7', 'm', 'dim', or '' for simple major
  order: number;
}

export interface Song {
  _id: string;
  title: string;
  metadata: {
    genre: string;
    mood: string;
    key: string;
    bpm: number;
  };
  sections: Section[];
  progression: Chord[]; // <-- The new Chord Lab data array
  updatedAt: string;
}
