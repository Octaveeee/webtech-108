# Aurora Art Gallery

A modern Next.js application showcasing an immersive 3D art gallery experience with artist management and contact features.

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Three.js / React Three Fiber** (3D scenes)
- **Supabase** (Database & Backend)


## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd art_gallery-nextjs
```

2. Install dependencies
```bash
npm install
```


3. Run the development server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Routes

- `/` — Home page
- `/about` — About the project
- `/artists` — Artists listing (connected to Supabase)
- `/galleries` — Galleries listing
- `/contacts` — Contact form and team information
- `/scenes3d` — Immersive 3D gallery experience



## Features

- **Responsive Navigation** - Mobile-friendly navbar with animated menu
- **3D Gallery Experience** - Immersive 3D scene with first-person controls
- **Artist Management** - Dynamic artist listing from Supabase database
- **Contact System** - Contact form with team information and social links
- **Location Map** - Google Maps integration for gallery location

## Scripts

```bash
npm run dev       # Start development server with Turbopack
npm run build     # Build for production
```

## Supabase

This project uses Supabase for data storage. The artists page fetches data from the Supabase `artists` table.

### Artists Table Structure

The `artists` table contains the following columns:
- `id` (uuid) - Primary key
- `name` (text) - Artist name
- `bio` (text, nullable) - Artist biography
- `country` (text, nullable) - Artist country
- `birth_date` (date, nullable) - Artist birth date
- `image_url` (text, nullable) - URL to artist image
- `created_at` (timestamptz) - Creation timestamp
- `updated_at` (timestamptz) - Last update timestamp


## Contributors

- **Octave SAVEAUX** — octave.saveaux@edu.ece.fr
- **Martin BRULEY** — martin.bruley@edu.ece.fr

## License

This project is part of the Web Technologies course at ECE Paris.
