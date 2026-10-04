# aaravsmall.github.io

Personal portfolio of **Aarav Samal**: AI engineer, forward deployed engineer and full-stack developer.

**Live:** https://aaravsmall.github.io

Built with Next.js (static export) and TypeScript. Every push to `main` deploys automatically to GitHub Pages through GitHub Actions.

## Updating the site

All content lives in `src/data/`. You never need to touch the page layout to change what it says.

| What | Where |
| --- | --- |
| Name, headline, intro, links, skills | `src/data/profile.ts` |
| Jobs and internships | `src/data/experience.ts` |
| Projects | `src/data/projects.ts` |
| Leadership and interests | `src/data/leadership.ts` |

### Update the resume

Replace `public/resume.pdf` with your new PDF, **keeping the filename `resume.pdf`**, then commit and push. Every resume button on the site points to that file.

You can do this entirely on github.com: open `public/`, click **Add file → Upload files**, drop in the new `resume.pdf`, and commit.

### Add photos to the photography page

The page is split into sections (Aviation, Nature, Urban). Drop image files into `public/photos/<section>/`, then add an entry to that section's `shots` list in `src/data/photos.ts`:

```ts
{ src: na("teton-sunrise.jpg"), alt: "Sunrise over the Tetons", caption: "First light", place: "Grand Teton, WY" },
```

`caption` and `place` are optional. For a video, add `video: av("clip.mp4")` and use `src` for a poster image; it loops silently in the grid and plays with sound in the viewer. iPhone HEIC/MOV files need converting to JPG/MP4 first. To add a new section, copy an existing one in the `sections` list.

### Add a project

Copy an existing entry in `src/data/projects.ts` and fill it in. Optional fields:

- `repo` / `live`: links. Leave them out if there's nothing public yet.
- `image`: put a screenshot in `public/projects/` and set `image: "/projects/your-file.png"`.
- `featured: true`: gives the project the large slot at the top of the Projects section.
- `status`: `"Live"`, `"In progress"` or `"Shipped"`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Custom domain (later)

Buy the domain, add a `public/CNAME` file containing just the domain (e.g. `aaravsamal.com`), point the DNS at GitHub Pages, and set it under **Settings → Pages**.
