# WebTech Project - Ongoing Labs

## Introduction
This repository is part of the Web Technologies course at ECE.  
It serves as a foundation for building the final project, with each lab adding incremental features to the application.  

Lab 4 focuses on initializing a Next.js application, building a skeleton for a website.

## Prerequisites
- Node.js installed
- npm (Node Package Manager)
- Git for version control
- A GitHub account for pushing commits and managing branches

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

### Start the development server
```bash
npm run dev
```

### Access the application in your browser
- Home page: [http://localhost:3000/](http://localhost:3000/)  
- About page: [http://localhost:3000/about](http://localhost:3000/about)  
- Contacts page: [http://localhost:3000/contacts](http://localhost:3000/contacts)  
- Articles list: [http://localhost:3000/articles](http://localhost:3000/articles)  
- Dynamic article page example: [http://localhost:3000/articles/1](http://localhost:3000/articles/1)  

> Note: Replace `1` with any article ID you create for testing.

## Project structure
```
client/
│-- components/
│   │-- Header.js
│   │-- Footer.js
│-- pages/
│   │-- index.js
│   │-- about.js
│   │-- contacts.js
│   │-- articles/
│       │-- [id].js
│       │-- index.js
│-- package.json
│-- README.md
```

## Lab 4 Features
- Next.js application initialization (`client` folder)
- React components for header, footer, and navigation
- Pages: Home, About, Contacts, Articles
- Dynamic routing for individual articles using `[id].js`


## Contributors
- Octave SAVEAUX (#webtech-108)
- Martin Bruley (#webtech-108)

## Team members 
- Octave SAVEAUX - [octave.saveaux@edu.ece.fr]
- Martin Bruley - [martin.bruley@edu.ece.fr]
