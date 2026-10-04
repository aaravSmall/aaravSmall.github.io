// The /photography page.
// The page is split into sections. Each section has a title, an optional
// one-line note and its own list of shots, shown in the order listed.
//
// Photos: drop image files into public/photos/<section>/ and add an entry.
// Videos: add `video` (an .mp4) and use `src` for its poster image. Videos
// loop silently in the grid and play with sound and controls in the viewer.
//
// Any size or shape works; the grid keeps each photo's own proportions.
// Entries whose file doesn't exist yet are skipped, and a section with no
// shots is hidden. `caption` and `place` are optional and show in the
// full-screen viewer.

export type Shot = {
  src: string;
  alt: string;
  video?: string;
  caption?: string;
  place?: string;
};

export type PhotoSection = {
  id: string;
  title: string;
  note?: string;
  shots: Shot[];
};

const av = (f: string) => `/photos/aviation/${f}`;
const na = (f: string) => `/photos/nature/${f}`;
const ur = (f: string) => `/photos/urban/${f}`;

export const photography = {
  intro:
    "Photography is how I slow down and actually look at a place. These are some of my favorite shots.",
  sections: [
    {
      id: "aviation",
      title: "Aviation Photography",
      note: "Spotting at O'Hare, Newark and Logan, plus whatever's out the window.",
      shots: [
        { src: av("9633.jpg"), alt: "A United jet banking overhead against broken clouds", place: "Newark, NJ" },
        { src: av("9074.jpg"), alt: "Qatar Airways Boeing 777 taxiing under a cloudy sky", place: "Chicago O'Hare" },
        { src: av("3817.jpg"), alt: "Wingtip over the Manhattan skyline at sunrise", caption: "Departure at dawn", place: "Over New York" },
        { src: av("1164-poster.jpg"), video: av("1164.mp4"), alt: "Video of an Airbus A380 on final approach", place: "Boston, MA" },
        { src: av("9068.jpg"), alt: "A United winglet glowing orange above the clouds", caption: "Golden hour at cruise", place: "Over Lake Erie" },
        { src: av("8940.jpg"), alt: "A United Airbus taxiing under scattered clouds", place: "Chicago O'Hare" },
        { src: av("1163.jpg"), alt: "Silhouette of a jet climbing out past a tree at dusk", place: "Boston, MA" },
        { src: av("8900.jpg"), alt: "A United 787 at the gate with ground crew, seen past an engine nacelle", place: "Chicago O'Hare" },
        { src: av("1171.jpg"), alt: "A jet on approach low over the beach", place: "Boston, MA" },
        { src: av("9079.jpg"), alt: "A United 737 MAX taxiing under grey skies", place: "Chicago O'Hare" },
        { src: av("1188.jpg"), alt: "A window-seat silhouette against a sunset wing", place: "In flight" },
        { src: av("9630.jpg"), alt: "A United Express jet climbing through the clouds", place: "Newark, NJ" },
        { src: av("8153.jpg"), alt: "Wet ramp and parked United jets from behind an engine", place: "Newark, NJ" },
        { src: av("1173-poster.jpg"), video: av("1173.mp4"), alt: "Video of a widebody jet on approach", place: "Boston, MA" },
        { src: av("9084.jpg"), alt: "A United Embraer regional jet on the taxiway", place: "Chicago O'Hare" },
        { src: av("9076.jpg"), alt: "An American Airlines jet taxiing past the O'Hare tower", place: "Chicago O'Hare" },
        { src: av("0846.jpg"), alt: "A widebody jet at the gate seen through terminal glass at sunset", place: "Athens, Greece" },
      ],
    },
    {
      id: "nature",
      title: "Nature Photography",
      note: "The Tetons, Yellowstone and Hawaii.",
      shots: [
        { src: na("0130.jpg"), alt: "The Teton Range above a creek and spring willows", place: "Grand Teton, WY" },
        { src: na("7905.jpg"), alt: "Sunrise breaking above the clouds from Haleakalā's summit", caption: "Sunrise above the clouds", place: "Haleakalā, Maui" },
        { src: na("0194.jpg"), alt: "A snow-capped peak above Jenny Lake framed by pines", place: "Grand Teton, WY" },
        { src: na("0418.jpg"), alt: "Steaming travertine terraces at Mammoth Hot Springs", place: "Yellowstone, WY" },
        { src: na("7761.jpg"), alt: "Waves rolling onto a beach framed by palms", place: "Hāna, Maui" },
        { src: na("0128.jpg"), alt: "Jagged Teton peaks under heavy clouds", place: "Grand Teton, WY" },
        { src: na("7358.jpg"), alt: "A jeep silhouetted on a ridge against the last light", place: "Mauna Kea, Hawaiʻi" },
        { src: na("0138.jpg"), alt: "Mount Moran reflected in the Snake River", place: "Grand Teton, WY" },
        { src: na("0407.jpg"), alt: "A waterfall crashing through a forested canyon", place: "Yellowstone, WY" },
        { src: na("7606.jpg"), alt: "An island floating in deep blue ocean, seen from the air", place: "Over Maui" },
        { src: na("0216.jpg"), alt: "Teton spires through pines on a bright day", place: "Grand Teton, WY" },
        { src: na("7837.jpg"), alt: "Red volcanic rock lit against the pre-dawn sky", place: "Haleakalā, Maui" },
        { src: na("0090.jpg"), alt: "The Teton Range over sagebrush flats", place: "Grand Teton, WY" },
        { src: na("0326.jpg"), alt: "A runoff stream across white geyser-basin crust", place: "Yellowstone, WY" },
        { src: na("7856.jpg"), alt: "A crater rim silhouetted against an orange horizon", place: "Haleakalā, Maui" },
        { src: na("0242.jpg"), alt: "Peaks rising above a lake and dense forest", place: "Grand Teton, WY" },
        { src: na("7812.jpg"), alt: "Grey surf under an overcast sky", place: "Hāna, Maui" },
        { src: na("0246.jpg"), alt: "Granite spires over a lake shoreline", place: "Grand Teton, WY" },
        { src: na("7912.jpg"), alt: "A crowd watching sunrise from the summit", place: "Haleakalā, Maui" },
        { src: na("0346.jpg"), alt: "Steam rolling over a geyser basin", place: "Yellowstone, WY" },
        { src: na("teton-road.jpg"), alt: "Two people standing on a roadside facing the Teton Range", place: "Grand Teton, WY" },
        { src: na("7843.jpg"), alt: "A thin line of dawn light under dark clouds", place: "Haleakalā, Maui" },
        { src: na("0039.jpg"), alt: "Rolling green valleys under scattered clouds", place: "Star Valley, WY" },
        { src: na("7920.jpg"), alt: "Pink sunrise over the summit visitor center", place: "Haleakalā, Maui" },
        { src: na("7752.jpg"), alt: "An orange cat napping on a gravel path", place: "Maui" },
        { src: na("0398.jpg"), alt: "Dusk over the Yellowstone Inn sign", place: "West Yellowstone, MT" },
        { src: na("7871.jpg"), alt: "Crowds gathering at the summit before dawn", place: "Haleakalā, Maui" },
      ],
    },
    {
      id: "urban",
      title: "Urban Photography",
      note: "New York, Boston and West Lafayette.",
      shots: [
        { src: ur("4253.jpg"), alt: "Lower Manhattan and One World Trade from above", place: "New York, NY" },
        { src: ur("4234.jpg"), alt: "The Empire State Building between Midtown towers", place: "New York, NY" },
        { src: ur("1143.jpg"), alt: "The Custom House clock tower framed by older facades", place: "Boston, MA" },
        { src: ur("5883.jpg"), alt: "A campus walkway under an orange autumn sunset", place: "West Lafayette, IN" },
        { src: ur("4248.jpg"), alt: "Hudson Yards and the Hudson River from the Empire State Building", place: "New York, NY" },
        { src: ur("2553.jpg"), alt: "Vanderbilt Ave and East 43rd St street signs", place: "New York, NY" },
        { src: ur("1082.jpg"), alt: "The Old State House among glass towers", place: "Boston, MA" },
        { src: ur("6505.jpg"), alt: "Looking up at a glass skyscraper on an overcast day", place: "New York, NY" },
        { src: ur("4311.jpg"), alt: "Midtown skyscrapers stretching to the horizon", place: "New York, NY" },
        { src: ur("1134.jpg"), alt: "A reflection in a mirror on a brick sidewalk", place: "Cambridge, MA" },
        { src: ur("4371.jpg"), alt: "The New York Public Library banners and Midtown towers", place: "New York, NY" },
        { src: ur("1145.jpg"), alt: "A downtown street of brick and stone buildings", place: "Boston, MA" },
        { src: ur("4471.jpg"), alt: "A McDonald's sign against a moody sky", place: "Indiana" },
        { src: ur("4368.jpg"), alt: "A marble elevator lobby", place: "New York, NY" },
      ],
    },
  ] as PhotoSection[],
};
