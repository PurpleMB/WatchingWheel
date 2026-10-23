import { TV_MAZE_BASE_URL, TV_MAZE_ENDPOINTS } from "./tvMaze.constants";
import { request } from "./client";
import type { ShowSearchResult, Show, Episode } from "./tvMaze.types";

export async function searchShows(query: string) : Promise<ShowSearchResult[]> {
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

export async function getShowEpisodeList(id: number, includeSpecials?: boolean) : Promise<Episode[]> {
  const params = new URLSearchParams();
  if (includeSpecials) {
    params.append("specials", "1");
  }

  const url = `${TV_MAZE_BASE_URL}${TV_MAZE_ENDPOINTS.getShowEpisodeList.replace(":id", id.toString())}?${params}`;

  const response = await request(url);

  return response;
}
