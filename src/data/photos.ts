// The /photography page.
// Drop image files into public/photos/ and list them below, in the order they
// should appear. Any size or shape works; the grid keeps each photo's own
// proportions. Entries whose file doesn't exist yet are skipped, and with no
// photos at all the page shows a "coming soon" note instead.
//
// `caption` and `place` are optional and show in the full-screen viewer.

export type Shot = { src: string; alt: string; caption?: string; place?: string };

export const photography = {
  intro:
    "Photography is how I slow down and actually look at a place. These are some of my favorite shots.",
  shots: [
    // { src: "/photos/01.jpg", alt: "Sunrise over the Tetons", caption: "First light", place: "Grand Teton, WY" },
  ] as Shot[],
};
