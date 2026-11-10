import { writeFileSync } from "fs";
import path from "path";

const API_KEY = process.env.TVDB_API_KEY;
const LIST_SIZE = 15;
const API_URL =
  "https://api4.thetvdb.com/v4/series/filter?country=usa&lang=eng&sort=score&sortType=desc";

if (!API_KEY) {
  throw new Error("TVDB_API_KEY env var is required to generate popular shows");
}

async function loginToTvdb() {
  const res = await fetch("https://api4.thetvdb.com/v4/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apikey: API_KEY }),
  });
  if (!res.ok) throw new Error(`TVDB login failed: ${res.status}`);
  const { data } = await res.json();
  return data.token;
}

async function fetchPopularShows(token) {
  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`TVDB popular fetch failed: ${res.status}`);
  const { data } = await res.json();
  return data;
}

const tvdbToken = await loginToTvdb();
const popularShows = await fetchPopularShows(tvdbToken);

const showSeeds = popularShows.slice(0, LIST_SIZE).map((show) => ({
  tvdbId: show.id,
  name: show.name,
}));

const outPath = path.resolve(import.meta.dirname, "../data/popularShows.json");
writeFileSync(
  outPath,
  JSON.stringify(
    { lastUpdated: new Date().toISOString(), popularShowSeedList: showSeeds },
    null,
    2,
  ),
);
console.log(
  `Updated popular show seed list at ${outPath} with ${showSeeds.length} entries on ${new Date().toISOString()}`,
);
