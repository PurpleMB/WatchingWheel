import {
    TV_MAZE_BASE_URL,
    TV_MAZE_ENDPOINTS,
} from './tvMaze.constants'
import { request } from './client'

export async function searchShows(query, { signal } = {}) {
    const params = new URLSearchParams({ q: query})

    const url = `${TV_MAZE_BASE_URL}${TV_MAZE_ENDPOINTS.searchShows}?${params}`

    const response = await fetch(
        url,
        { signal },
    )

    if (!response.ok) {
        throw new Error(`TVMaze show search failed: ${response.status}`)
    }

    return response.json()
}