// Looks up cover art from the public iTunes Search API at build time.
// The site is a static export, so this runs once during `npm run build`
// and the image URLs get baked into the HTML. If a lookup fails, the
// page falls back to a plain numbered tile instead of an image.

type ItunesResult = {
  artistName?: string;
  trackName?: string;
  collectionName?: string;
  artworkUrl100?: string;
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

// iTunes lists Twenty One Pilots as "twenty one pilots" and some artists
// with features, so match loosely on the first named artist.
const sameArtist = (a: string, b: string) => {
  const x = norm(a.split("/")[0]);
  const y = norm(b);
  return y.includes(x) || x.includes(y);
};

const big = (url: string) => url.replace(/\/\d+x\d+bb\./, "/300x300bb.");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// iTunes rate-limits bursts (~20 requests a minute), so lookups run one at a
// time with a short gap, and a throttled request is retried after a pause.
let queue: Promise<unknown> = Promise.resolve();

function search(term: string, entity: "song" | "album"): Promise<ItunesResult[]> {
  const run = async (): Promise<ItunesResult[]> => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&limit=25&country=US`;
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const res = await fetch(url, { cache: "force-cache" });
        if (res.ok) {
          const data = (await res.json()) as { results?: ItunesResult[] };
          await sleep(1500);
          return data.results ?? [];
        }
        if (res.status !== 403 && res.status !== 429) return [];
      } catch {
        // network hiccup: fall through to retry
      }
      await sleep(15000 * (attempt + 1));
    }
    return [];
  };
  const next = queue.then(run, run);
  queue = next.catch(() => undefined);
  return next;
}

function pickSong(results: ItunesResult[], title: string, artist: string) {
  const byArtist = results.filter((r) => r.artistName && r.artworkUrl100 && sameArtist(artist, r.artistName));
  return byArtist.find((r) => r.trackName && norm(r.trackName).startsWith(norm(title))) ?? byArtist[0];
}

export async function songCover(title: string, artist: string): Promise<string | null> {
  let hit = pickSong(await search(`${title} ${artist.split("/")[0]}`, "song"), title, artist);
  if (!hit) hit = pickSong(await search(title, "song"), title, artist);
  if (!hit) {
    console.warn(`[artwork] no cover found for "${title}" by ${artist}`);
    return null;
  }
  return big(hit.artworkUrl100!);
}

export async function artistCover(artist: string): Promise<string | null> {
  const results = await search(artist.split("/")[0], "album");
  const hit = results.find((r) => r.artistName && r.artworkUrl100 && sameArtist(artist, r.artistName));
  return hit?.artworkUrl100 ? big(hit.artworkUrl100) : null;
}
