import { TV_MAZE_BASE_URL, TV_MAZE_ENDPOINTS } from "./tvMaze.constants";
import { request } from "./client";

export async function searchShows(
  query: string,
  { signal }: { signal?: AbortSignal } = {},
) {
  const params = new URLSearchParams({ q: query });

  const url = `${TV_MAZE_BASE_URL}${TV_MAZE_ENDPOINTS.searchShows}?${params}`;

  const response = await request(url, { signal });

  return response;
}
