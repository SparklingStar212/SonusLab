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
  updatedAt: string;
}
