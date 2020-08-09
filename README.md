[![Netlify Status](https://api.netlify.com/api/v1/badges/55d0b70b-4cad-4c9d-9f5b-a013c7503c2e/deploy-status)](https://app.netlify.com/sites/mrsravoon/deploys)

# Mrs. RAVOON

## Mrs. RA-WHOM? What is this?

A [website](https://www.mrsravoon.uk) dedicated to tracking ongoing
[Sightings](https://www.mrsravoon.uk/sightings/) of Mrs. RAVOON

## Technical features

### Eleventy

- [Eleventy Navigation](https://www.11ty.dev/docs/plugins/navigation/) plugin to
  build menus
- Tag support

### Build

- Rollup build pipeline for JS and Svelte
- Global CSS generated from SCSS with PostCSS post-processing

### Netlify

- Content managed via Netlify CMS with editor previews
- Authentication via Netlify Identity
- Contact form powered by Netlify Forms
- Continuous Deployment workflow via Netlify
- DNS managed by Netlify DNS
- Served via Netlify's global CDN

## Local development

```sh
git clone git@github.com:oliverturner/mrsravoon.uk.git
cd mrsravoon.uk
npm i
npm run dev
```

## Upcoming features

- [ ] ESLinting for TypeScript files
- [ ] PWA features
- [ ] Tests!
- [ ] Rhyme helper