// Edit this file to change the "Top artists & songs" section.
// Both lists are sorted alphabetically by artist on the page, so order here doesn't matter.
// Cover art is looked up automatically at build time (see src/lib/artwork.ts).

// The short paragraph under the section title.
export const musicBlurb =
  "I listen to a bit of everything and I'm always pushing to widen what I know and what I like. I take real pride in finding lowkey, underground artists before they blow up, and nothing beats recommending something to a friend and watching it become their new favorite. That's what this list is: my top 10 artists and top 15 songs right now. Music keeps me focused when I'm building, lifts my mood when I need it, and is a big part of how I look after my mental health.";

// The hint shown above the lists.
export const musicHint = "Click a cover for a 15-second preview, or a name to open it on Spotify.";

export const spotify = {
  username: "aaravsmall",
  url: "https://open.spotify.com/user/aaravsmall",
};

// Each name on the page links to Spotify. `spotify` is the exact artist/track link
// (Share → Copy link in Spotify). Leave it out and the name links to a Spotify
// search for it instead. For a combined entry like "BoyWithUke / Chandol", give
// one link per name, in the same order.
export type Artist = { name: string; spotify?: string | string[] };

const artist = (id: string) => `https://open.spotify.com/artist/${id}`;
const track = (id: string) => `https://open.spotify.com/track/${id}`;

export const topArtists: Artist[] = [
  { name: "Harry Styles", spotify: artist("6KImCVD70vtIoJWnq6nGn3") },
  { name: "Twenty One Pilots", spotify: artist("3YQKmKGau1PzlVlkL1iodx") },
  { name: "Arctic Monkeys", spotify: artist("7Ln80lUS6He07XvHI8qqHH") },
  { name: "James Marriott", spotify: artist("14apS9tKI3K30GK92BNQUL") },
  { name: "BoyWithUke / Chandol", spotify: [artist("1Cd373x8qzC7SNUg5IToqp"), artist("6QxpOqXgNVgObidnodQ9yz")] },
  { name: "Ninajirachi", spotify: artist("3MekbRujJg5VZThubOlrkR") },
  { name: "Tame Impala", spotify: artist("5INjqkS1o8h1imAzPqGZBb") },
  { name: "Videoclub" },
  { name: "Peter McPoland", spotify: artist("23E65IfLBGQv0FBrMwCcG2") },
  { name: "Royel Otis", spotify: artist("5b5bt4mZQpJMoCRbiQ7diH") },
];

// Optional per song: `album` helps find the cover when the song search misses,
// `cover` (an image URL) overrides the looked-up art, and `spotify` is the track link.
// Previews: clicking a cover plays 15 seconds of Apple's 30-second preview clip,
// which is usually the hook. `previewStart` (0 to 15) skips into that clip if the
// best part comes later; `preview` (an audio URL) replaces the clip entirely.
export type Song = {
  title: string;
  artist: string;
  album?: string;
  cover?: string;
  spotify?: string;
  preview?: string;
  previewStart?: number;
};

export const topSongs: Song[] = [
  { title: "Brazil", artist: "Declan McKenna", spotify: track("5dNyqTmZPSN7qKeQzTTVUm") },
  { title: "On Melancholy Hill", artist: "Gorillaz", spotify: track("1PtDxCeS5h6Fz3bU9BsHBe") },
  { title: "Rhinestone Eyes", artist: "Gorillaz", spotify: track("7BUHADRZkjF3BpWsax5SBN") },
  { title: "Amour plastique", artist: "Videoclub", spotify: track("3vTQ939Tlk6CXYtQgMOFUR") },
  { title: "Suricate ODZ", artist: "Videoclub", spotify: track("2wLpYTxV3laz3kaGL3xH38") },
  { title: "Where Is My Mind?", artist: "Pixies", spotify: track("6mcxQ1Y3uQRU0IHsvdNLH1") },
  { title: "Skinny Love", artist: "Bon Iver", spotify: track("1NyFRrFiJAJIaR6icj1goI") },
  {
    title: "This House Is a Circus",
    artist: "Arctic Monkeys",
    album: "Favourite Worst Nightmare",
    spotify: track("7gPd55hW5pVjTm3H9S1Wbv"),
  },
  { title: "Mulberry Street", artist: "Twenty One Pilots", spotify: track("19kX6hSlYH31js2SL4jgrj") },
  { title: "Sign of the Times", artist: "Harry Styles", spotify: track("5ELRkzdzz0HvGpMDlfZHkV") },
  { title: "Time to Pretend", artist: "MGMT", spotify: track("4iG2gAwKXsOcijVaVXzRPW") },
  { title: "Grapes", artist: "James Marriott" },
  { title: "Center Mass", artist: "Twenty One Pilots", spotify: track("2BHSRlGgJwzTPfYvAax28m") },
  { title: "505", artist: "Arctic Monkeys", spotify: track("1FJ7sEf02HAmfVTEfQvmOV") },
  { title: "The Boy Who Played the Harp", artist: "Dave", spotify: track("4eG6IuQsO5nkn4Cxos3MaO") },
];

// Fallback when an entry has no exact link: a Spotify search for it.
export const spotifySearch = (q: string) => `https://open.spotify.com/search/${encodeURIComponent(q)}`;
