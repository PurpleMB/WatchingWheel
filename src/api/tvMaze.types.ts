export interface Show {
  id: number;
  url: string;
  name: string;
  image?: {
    medium?: string;
    original?: string;
  };
}

export interface ShowSearchResult {
  score: number;
  show: Show;
}

export interface ApiEpisode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  image?: {
    medium?: string;
    original?: string;
  };
  summary: string;
}

export interface Episode extends ApiEpisode {
  show: Show;
}