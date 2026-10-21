import { TV_MAZE_BASE_URL, TV_MAZE_ENDPOINTS } from "./tvMaze.constants";
import { request } from "./client";
import type { SearchResult, Show } from "./tvMaze.types";

export async function searchShows(query: string) : Promise<SearchResult[]>{
  const params = new URLSearchParams({ q: query });

  const url = `${TV_MAZE_BASE_URL}${TV_MAZE_ENDPOINTS.searchShows}?${params}`;

  const response = await request(url);

  return response;
}

export async function lookupShowByTvdbId(id: number) : Promise<Show>{
  const params = new URLSearchParams({ thetvdb: id.toString() });

  const url = `${TV_MAZE_BASE_URL}${TV_MAZE_ENDPOINTS.lookupShowByTvdbId}?${params}`;

  const response = await request(url);

  return response;
}
