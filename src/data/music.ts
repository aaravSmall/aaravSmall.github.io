// Edit this file to change the "Top artists & songs" section.
// Both lists are sorted alphabetically by artist on the page, so order here doesn't matter.
// Cover art is looked up automatically at build time (see src/lib/artwork.ts).

export const spotify = {
  username: "aaravsmall",
  url: "https://open.spotify.com/user/aaravsmall",
};

export const topArtists: string[] = [
  "Harry Styles",
  "Twenty One Pilots",
  "Arctic Monkeys",
  "James Marriott",
  "BoyWithUke / Chandol",
  "Ninajirachi",
  "Tame Impala",
  "Videoclub",
  "Peter McPoland",
  "Royel Otis",
];

// Optional per song: `album` helps find the cover when the song search misses,
// and `cover` (an image URL) skips the lookup entirely.
export type Song = { title: string; artist: string; album?: string; cover?: string };

export const topSongs: Song[] = [
  { title: "Brazil", artist: "Declan McKenna" },
  { title: "On Melancholy Hill", artist: "Gorillaz" },
  { title: "Rhinestone Eyes", artist: "Gorillaz" },
  { title: "Amour plastique", artist: "Videoclub" },
  { title: "Suricate ODZ", artist: "Videoclub" },
  { title: "Where Is My Mind?", artist: "Pixies" },
  { title: "Skinny Love", artist: "Bon Iver" },
  { title: "This House Is a Circus", artist: "Arctic Monkeys", album: "Favourite Worst Nightmare" },
  { title: "Mulberry Street", artist: "Twenty One Pilots" },
  { title: "Sign of the Times", artist: "Harry Styles" },
  { title: "Time to Pretend", artist: "MGMT" },
  { title: "Grapes", artist: "James Marriott" },
  { title: "Center Mass", artist: "Twenty One Pilots" },
  { title: "505", artist: "Arctic Monkeys" },
  { title: "The Boy Who Played the Harp", artist: "Dave" },
];
