# WedPage Wedding Invitation Template

A mobile-first wedding invitation website built with React 18 and Vite. Wedding content is centralized in `src/data/weddingData.js`; update that object to customize the invitation for another couple.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`, then preview it with `npm run preview`.

## Customize

Edit `src/data/weddingData.js` to set the couple, date, story, event details, gallery images, map embed, and Google Forms RSVP URL. Images currently use Unsplash image URLs; replace them with approved client imagery for production.

The app is a static frontend with no backend. It can be deployed to Vercel by importing the GitHub repository, using `npm run build` as the build command, and `dist` as the output directory.

## Deploy to GitHub Pages

Pushing to `main` builds the site and deploys it to GitHub Pages with the included workflow. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The site will be available at `https://wedpage8.github.io/wedpage-template/`.