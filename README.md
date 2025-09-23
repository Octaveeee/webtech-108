# LAB2 Node.js - Web Server

## Introduction
This project is part of the Web Technologies course at ECE.  
It demonstrates how to create a simple Node.js HTTP server with multiple routes, including:

- Home route (`/`)
- Hello route (`/hello?name=YourName`)
- About route (`/about`) serving JSON content
- Dynamic routing for JSON files
- 404 error handling


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

2. Navigate to the project folder:

```bash
cd lab2-node
```

3. Install dependencies (Nodemon for development):

```bash
npm install
```

## Usage

### Start the server
```bash
npm start
```

### Start in development mode with auto-reload (Nodemon)
```bash
npm run dev
```

### Access the application in your browser
- Home page: [http://localhost:8080/](http://localhost:8080/)  
- Hello route: [http://localhost:8080/hello?name=YourName](http://localhost:8080/hello?name=YourName)  
- About route (JSON): [http://localhost:8080/about](http://localhost:8080/about)  



## Project structure
```
lab2-node/
│-- content/
│   │-- about.json
│-- handles.js
│-- index.js
│-- package.json
│-- README.md
```

## Contributors
- Octave SAVEAUX