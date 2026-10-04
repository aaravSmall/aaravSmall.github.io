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

Drop image files into `public/photos/`, then list each one in `src/data/photos.ts`:

```ts
{ src: "/photos/teton-sunrise.jpg", alt: "Sunrise over the Tetons", caption: "First light", place: "Grand Teton, WY" },
```

`caption` and `place` are optional. Until at least one photo is listed, the page shows a "coming soon" note.

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
