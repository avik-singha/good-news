﻿## GOOD NEWS

Good News is a web application that showcases positive news around the world.

more details coming soon...



## PROJECT DETAILS


## File Structure
```
.
├── .vscode/ - Visual Studio Code configuration files
├── backend/ - Backend App
│ ├── routes/ - Handles API calls for routes
│ ├── scripts/ - scripts to publish
│ ├── app.js - Adds middleware to the express server
│ ├── constants.js - Defines the constants for the endpoints and port
│ └── server.js - Configures Port and HTTP Server
├── frontend/ - Frontend App
│ ├── public/ - public static files
│ ├── scripts/ - scripts to publish
│ ├── src/ - react app folder
│ │ ├── components - React components for each page
│ │ ├── App.js - React routing
│ └─└── index.js - React root component
└── README.md
```

### Frontend

The frontend is based on [create-react-app](https://github.com/facebook/create-react-app).

The most important scripts in the `package.json` are:
  - start: serves the frontend in development on http://localhost:3000/.
  - build: Builds the app for production to the `build` folder.
  - publish: Builds the app for production and moves the output to the `publish` folder.
  - test: Launches the test runner in the interactive watch mode.

To start the frontend application manually:
  1. Open a terminal and navigate to the `frontend` folder path.
  2. Use `yarn install` or `npm install` to install frontend dependencies.
  3. Use `yarn start` or `npm start` to start frontend app in development.

### Backend

The backend is based on [Express Generator](https://expressjs.com/en/starter/generator.html).

The most important scripts in the `package.json` are:
  - start: serves the backend in development on http://localhost:3001/.
  - publish: copies the backend files to the `publish` folder.

To start the backend application manually:
  1. Open a terminal and navigate to the `backend` folder path.
  2. Use `yarn install` or `npm install` to install backend dependencies.
  3. Use `yarn start` or `npm start` to start backend app in development.


