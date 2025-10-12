# WebTech Project - Ongoing Labs

## Introduction
This repository is part of the **Web Technologies** course at **ECE Paris**.  
It serves as a working base for all the labs completed throughout the semester.  
Each lab progressively builds new functionalities toward the final web project.

**Lab 4** focuses on setting up a **Next.js** application, creating the main structure of the website and defining its first components and pages.

## Technologies Used
- **Next.js**
- **React.js**
- **Node.js**
- **npm**

## Prerequisites
Before starting, make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- Git for version control
- A GitHub account to manage commits and branches

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Octaveeee/webtech-108.git
   ```

2. Navigate to the Next.js application folder:
   ```bash
   cd client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Start the development server:
```bash
npm run dev
```

Then open your browser and access:
- Home: [http://localhost:3000/](http://localhost:3000/)
- About: [http://localhost:3000/about](http://localhost:3000/about)
- Contacts: [http://localhost:3000/contacts](http://localhost:3000/contacts)
- Articles list: [http://localhost:3000/articles](http://localhost:3000/articles)
- Example article page: [http://localhost:3000/articles/1](http://localhost:3000/articles/1)

> Replace `1` with any valid article ID for testing.

## Project Structure
```
content/
public/
src/
│-- app/
│   │-- about/
│   │   │-- page.js
│   │-- articles/
│   │   │-- [id]/
│   │   │   │-- page.js
│   │   │-- page.js
│   │-- components/
│   │   │-- footer.js
│   │   │-- header.js
│   │   │-- navbar.js
│   │-- contacts/
│   │   │-- page.js
│   │-- global.css
│   │-- layout.js
│   │-- page.js
│-- README.md
│-- .gitignore
│-- package.json
│-- etc/
```

## Lab 4 Overview
- Initialization of a **Next.js** project (`client` folder)
- Creation of shared components: header, footer, and navigation
- Implementation of basic pages: Home, About, Contacts, and Articles
- Dynamic routing setup for individual article pages

## Progress
- ✅ Lab 4 completed  
- 🔄 Project development ongoing (further labs to be integrated)

## Contributors
- **Octave SAVEAUX** (#webtech-108)
- **Martin BRULEY** (#webtech-108)

## Contact
- Octave SAVEAUX — [octave.saveaux@edu.ece.fr]
- Martin BRULEY — [martin.bruley@edu.ece.fr]
