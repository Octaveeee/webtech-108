# Art Gallery — Next.js

## Introduction
This project is part of the Web Technologies course at ECE Paris. It is a modern
Next.js application showcasing a responsive navigation, a styled footer, and an
experimental 3D scene area for a virtual gallery experience.

## Tech Stack
- Next.js 14 (App Router)
- React
- Tailwind CSS
- Three.js / React Three Fiber (3D scenes)
- Node.js, npm

## Getting Started

1) Clone the repository
```bash
git clone https://github.com/Octaveeee/webtech-108.git
cd art_gallery-nextjs
```

2) Install dependencies
```bash
npm install
```

3) Run the development server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Live Demo
- Vercel: [webtech-108.vercel.app](https://webtech-108.vercel.app/)

## Available Routes
- `/` — Home
- `/about` — About
- `/contacts` — Contacts
- `/artists` — Artists listing (static page)
- `/galleries` — Galleries listing (static page)
- `/scenes3d` — Experimental 3D scene

## Project Structure
```
public/
│-- assets/
│   │-- logo1.png
│   │-- logo2.png

src/
│-- app/
│   │-- about/
│   │   │-- page.js
│   │-- contacts/
│   │   │-- page.js
│   │-- scenes3d/
│   │   │-- page.js
│   │-- layout.js
│   │-- globals.css
│   │-- page.js              # Home
│-- components/
│   │-- navbar.js
│   │-- footer.js
│   │-- scenes3d/
│   │   │-- GalleryRoom.jsx
│   │   │-- GalleryScene.js
│   │   │-- MovementControls.jsx
│   │   │-- Player.jsx

tailwind.config.js
package.json
README.md
```

## Notable Features
- Responsive navbar with mobile menu and animated icon
- Fullscreen overlay navigation
- Styled footer with concise project note and external links
- 3D scene components (WIP) in `src/components/scenes3d`

## Scripts
```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run start     # Start production server
```


## Contributors
- Octave SAVEAUX (#webtech-108)
- Martin BRULEY (#webtech-108)

## Contact
- Octave SAVEAUX — octave.saveaux@edu.ece.fr
- Martin BRULEY — martin.bruley@edu.ece.fr