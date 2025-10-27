interface Film {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
}

type newFilm = Omit<Film, "id">;

interface Text {
  id: string;
  content: string;
  level: 'easy' | 'medium' | 'hard';
}

type newText = Omit<Text, "id">;

export type { Film, newFilm, Text, newText };
