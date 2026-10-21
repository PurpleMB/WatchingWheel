export interface Show {
    id: number;
    url: string;
    name: string;
    image?: {
        medium?: string;
        original?: string;
    };
}

export interface SearchResult {
    score: number;
    show: Show;
}