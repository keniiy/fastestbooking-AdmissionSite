# Admission-site

You can find the deployed project at coming soon

### Key Features

- Create your student account and application with one single form
- Student:
  - Apply for admission
  - create student profile
- Admin:
  - get list of all admission
  - get list of admission by department
  - delete fraudulent application
  - update student status application

- sign up and sign in is not required it all an open system so authentication was not required you need to add that yourself if you want to use the project

## Tech Stack

Node.js, Express framework, MongoDB with Mongoose Redis, Queue, Kue,

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm start** to start the local server
- **npm run start** to start the local server with nodemon
- **npm run** to start the local server with nodemon
- **npm test** to start server using testing environment

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following not compulsory only for deployment:

```
PORT=""
TEST_DB=""
DATA_DB=""
REDIS=""

```

## Endpoints
😃Documentation for Endpoints can be found [here](https://documenter.getpostman.com/view/3210014/TzXxjHgZ)

