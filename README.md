# GOOD NEWS

## TABLE OF CONTENT

- [Overview](#overview)
- [Project Details](#project-details)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [Limitation](#limitation)
- [Roadmap](#roadmap)
- [Team Members](#team-members)

## OVERVIEW

Good News is a web application that showcases positive news around the world.

This project was developed thanks to the amazing [idea](https://www.mongodb.com/community/forums/t/looking-for-hackers-good-news-for-a-change/157865) by [Angie Byron](https://github.com/webchick) for the [MongoDB World Hackathon]() and the motive was simple - modern news is chiefly depressing and vastly filled with negativity, so why don't we create an application that displays just the good things going on in the world?!

The overall objective of this project is hence to change the user's focus to the ray of sunshine in a world that seems to be blinded by the dark clouds.

## PROJECT DETAILS

The 'goodnews' application displays news with a higher average tone which implies relative positivity and also significant impact using the GoldsteinScale.
 
For details on the average tone and Goldstein Metrics see the [GDELT Event CodeBook](http://data.gdeltproject.org/documentation/GDELT-Event_Codebook-V2.0.pdf)

For limitations based on this project's usage of these metrics, see [Limitations](LIMITATIONS)

This project's source of news is the [GDELT](https://www.gdeltproject.org/) dataset which is a Global Dataset of Event, Languages and Tones. This dataset covers news from every country in the world with a reach of over a 100 languages!

More information on the GDELT dataset [here](https://www.gdeltproject.org/)

## TECHNOLOGIES
- Frontend
  - React
  - Bootstrap
- Backend
  - Node.js
  - Express
  - MongoDB 
    - Atlas
    - Realm Functions
    - Realm Triggers
    - Charts
  - Mongoose ODM
For more information on what these technologies are used for in this project, check the [technologies details section](TECHNOLOGIES-DETAILS)

## FILE STRUCTURE
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

## LIMITATION
This project makes use of the *Average Tone* metric from the GDELT dataset to display positive news.

However, in GDELT 2.0's [Global Knowledge Graph](https://blog.gdeltproject.org/gdelt-2-0-our-global-world-in-realtime/) there are more specific tones which might yield better accuracy in identifying and displaying positive data, but the process of getting this GKG data from the GDELT dataset, writing a new field file, reshaping, and working with afore-mentioned data is beyond the scope of this hackathathon.

## ROADMAP
Below are a few possible features that if added, would improve this project

- A search bar (based on Atlas search) for searching for positive news about a particular subject (puppies?)
- Based on the [original idea](https://www.mongodb.com/community/forums/t/looking-for-hackers-good-news-for-a-change/157865), a mobile app which notifies users of occassional good news updates.

Contributions are welcome and usage of the project is guided by the attached License .

## TECHNOLOGIES DETAILS
- Realm Triggers - this project makes use of scheduled mongoDB Realm Triggers to update the *events* collection with recent data from the GDELT dataset (which is updated every 15 minutes).
  - See this [video](https://youtu.be/nEMIDCyi3Os) and this [repo](https://github.com/mongodb-developer/mongodb-world-2022-hackathon/) for details on how this works.

- Realm functions - these are serverless functions that operate on data directly in the project's Atlas clusters.
  - The serverless functions used for this project are responsible for handling the updating of the collection with recent gdelt data and also the fetching and updating of the collection's data with metadata information (this last feature of the function was still a work-in-progress as at the time of this edit).
  - See this [video](https://youtu.be/nEMIDCyi3Os) and this [repo](https://github.com/mongodb-developer/mongodb-world-2022-hackathon/tree/main/realm_functions) for details on how this works.
  - Also note [this discussion](https://www.mongodb.com/community/forums/t/realm-trigger-duplicate-key-error/164259/6?u=fiewor_john) on the MongoDB forum for a fix on the function.

- Charts - MongoDB Charts provide an easy-to-use means of visualising data which is interactive and updates periodically based on changes in the data source.
  - This project uses MongoDB Charts to visualise data in interesting formats such as goodnews per day, total goodnews per country, and two geo-spatial representations of goodnews data in countries.

## TEAM MEMBERS
- Sucheta Singha [LinkedIn](https://www.linkedin.com/in/sucheta-singha/)[Github](https://github.com/sucheta21)
- Avik Singha [LinkedIn](https://www.linkedin.com/in/aviksingha/)[Github](https://github.com/avik-singha/)
- John Fiewor [LinkedIn](https://www.linkedin.com/in/john-fiewor-365484127/)[Github](https://github.com/Fiewor)
