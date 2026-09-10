import type { Song } from "../types";

// In a real app, this would use import.meta.env.VITE_API_URL
const BASE_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const token = localStorage.getItem("sonuslab_token"); // Or however you store auth
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  getSongs: async (): Promise<Song[]> => {
    const res = await fetch(`${BASE_URL}/api/songs`, { headers: getHeaders() });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  },
  getSong: async (id: string): Promise<Song> => {
    const res = await fetch(`${BASE_URL}/api/songs/${id}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
  },
  createSong: async (title: string = "Untitled Track"): Promise<Song> => {
    const res = await fetch(`${BASE_URL}/api/songs`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ title }),
    });
    if (!res.ok) throw new Error("Failed to create project");
    return res.json();
  },
  updateSong: async (id: string, updates: Partial<Song>): Promise<Song> => {
    const res = await fetch(`${BASE_URL}/api/songs/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error("Failed to save project");
    return res.json();
  },
  deleteSong: async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/songs/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete project");
  },
};
