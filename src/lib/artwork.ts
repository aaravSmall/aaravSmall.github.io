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

async function search(term: string, entity: "song" | "album"): Promise<ItunesResult[]> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=${entity}&limit=15&country=US`;
  try {
    const res = await fetch(url, { cache: "force-cache" });
    if (!res.ok) return [];
    const data = (await res.json()) as { results?: ItunesResult[] };
    return data.results ?? [];
  } catch {
    return [];
  }
}

export async function songCover(title: string, artist: string): Promise<string | null> {
  const results = await search(`${title} ${artist.split("/")[0]}`, "song");
  const byArtist = results.filter((r) => r.artistName && r.artworkUrl100 && sameArtist(artist, r.artistName));
  const exact = byArtist.find((r) => r.trackName && norm(r.trackName).startsWith(norm(title)));
  const hit = exact ?? byArtist[0];
  return hit?.artworkUrl100 ? big(hit.artworkUrl100) : null;
}

export async function artistCover(artist: string): Promise<string | null> {
  const results = await search(artist.split("/")[0], "album");
  const hit = results.find((r) => r.artistName && r.artworkUrl100 && sameArtist(artist, r.artistName));
  return hit?.artworkUrl100 ? big(hit.artworkUrl100) : null;
}
