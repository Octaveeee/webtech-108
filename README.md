# Aurora Art Gallery

Aurora Art Gallery is a web platform that allows users to create, explore, and interact with immersive 3D art galleries, featuring artist profiles, gallery management, and a fully interactive 3D viewing experience.

## Tech Stack

- **Next.js 15** (App Router) - React framework with Server and Client Components
- **React 19** - UI library
- **Tailwind CSS 4** - CSS framework
- **Three.js / React Three Fiber** - 3D graphics and immersive scenes
- **Supabase** - Authentication, Database, Row Level Security
- **Resend** - Email service for contact form

## Prerequisites

- Node.js
- npm
- A Supabase account and project
- (Optional) Resend API key for contact form functionality

## Instructions to Run Locally

1. Clone the repository
```bash
git clone https://github.com/Octaveeee/webtech-108.git
cd webtech-108
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
RESEND_API_KEY=your-resend-api-key
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## User Guide

### Getting Started

1. **Browse Artists**: Visit `/artists` to see all available artists in the collection
2. **Explore Galleries**: Go to `/galleries` to browse all created galleries
3. **Search**: Use the search bar on the galleries page to find galleries by name

### Creating an Account

1. Click "Register" in the navigation bar
2. Fill in your email, password, name, and birth date

### Creating a Gallery

1. Log in to your account
2. Navigate to `/galleries`
3. Click "Create Gallery" button
4. Fill in the gallery name and description
5. Choose a layout from three predefined options:
   - **Large Open Room**: A single space without interior walls
   - **Divided Space**: Some walls to create 2-3 zones
   - **Small Room**: A compact space with minimal walls
6. Click "Create Gallery"

### Managing Your Gallery

- **View Gallery**: Click on any gallery card to see details
- **Toggle Status**: Gallery owners can toggle between "Finished" and "In Development" status
- **Delete Gallery**: Gallery owners can delete their galleries (action cannot be undone)
- **Visit 3D Scene**: Click "Visit 3D Gallery" to enter the immersive 3D experience (only available for finished galleries)

### 3D Gallery Experience

Once in a 3D gallery scene:
- **ZSQD Keys**: Move around (Z: forward, S: backward, Q: left, D: right)
- **Space**: Jump
- **Mouse**: Look around and control camera direction
- **Help Panel**: Controls are displayed on the right side of the screen

### Interacting with Galleries

- **Comments**: Logged-in users can post comments on galleries
- **Delete Comments**: Users can delete their own comments
- **View Creator**: See who created each gallery

### Contact

- Visit `/contacts` to send a message to the team
- View team member contact information and social links
- See the gallery location on an interactive map

## Available Routes

- `/` - Home page with project overview
- `/artists` - Browse all artists
- `/artists/[id]` - View artist details
- `/galleries` - Browse all galleries with search functionality
- `/galleries/create` - Create a new gallery (requires authentication)
- `/galleries/[name]` - View gallery details, comments, and management options
- `/galleries/[name]/scene` - Immersive 3D gallery experience
- `/auth` - Authentication (login/register)
- `/contacts` - Contact form and team information
- `/about` - About the project




## Contributors

- **Octave SAVEAUX** — octave.saveaux@edu.ece.fr
- **Martin BRULEY** — martin.bruley@edu.ece.fr

## License

This project is part of the Web Technologies course at ECE Paris.
