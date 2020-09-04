# Regal Voice Technical Assignment
> This project is aimed to develop a frontend, backend, and database suitable for the Regal Voice technical assessment as a part of their hiring process. Additionally, this code can be used as a boilerplate to start a Node.js/Express.js/React.js web application.

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Directory Structure](#directory)
* [Setup](#setup)
* [Notes](#notes)
* [Documentation](#documentation)
* [Features](#features)
* [Contact](#contact)

## General info
This is a dummy project developed to show off backend development with a suite of technologies. One goal for this project is to ensure the ease of use with respect to set up. All of these technologies can be found below.

## Technologies
* Node.js
* Express.js
* Sequelize ORM
* OpenAPI 3.0
* MySQL
* Docker

## Directory
    .
    ├── ...
    ├── backend
    │   ├── src                     # source code for backend
    │   |   ├── db                  # DB Models and configuration
    │   |   ├── helpers             # Helper code
    │   |   ├── server  
    │   |   |   ├── auth            # Placeholder auth for JWT.
    │   |   |   ├── controllers     # Controllers for API
    │   |   |   └── routes          # Routes for API
    │   |   └── spec                # OpenAPI spec documentation
    │   ├── tests                   # End-to-end, integration tests (alternatively `e2e`)
    │   ├── sequelize               # Sequelize ORM configuration and migrations
    │   └── coverage                # Code coverage report
    ├── frontend
    │   ├── src                     # source code for frontend
    │   └── dist                    # Dist folder to hold all static assets once compiled.
    └── ...

## Setup
This project is built using Docker containers, thus you will need Docker installed for it to work. A docker-compose file is placed in the root of the repository. Follow the steps below to get started:

Check out the repository:

```
git clone https://github.com/maraja/regalvoice-assignment
```

Change into the repository directory:

```
cd regalvoice-assignment
```

Run the following Docker command within the root directory:

```
docker-compose up
```

#### To edit code
Before working with the code, you must have Node.js installed (the latest LTS version should work just fine). Change into the backend repository directory:

```
cd regalvoice-assignment/backend
```
Install yarn:

```
npm install -g yarn
```

Install all the necessary modules:
```
yarn
```

Now you can begin editing! Once you start the application following the instructions at the beginning of the setup (i.e., running `docker-compose up`), editing any file will automatically restart the application.


#### To run tests

```
docker-compose run --rm backend yarn test
```

#### To re-initialize db

You can reinitialize the db in case anything goes wrong. Simply connect to the docker container as shown above and run the following command: `yarn init`

## Notes
This project is aimed to show off the capability of a full fledged Twilio based, calling application. This project leverages a messaging queue to simulate the wait time to release calls. As there is a requirement to wait 30 seconds before dispatching a call, the backend queues up the call and returns a receipt immediately. The call is then made 30 seconds afterwards. I've included a producer and consumer service which illustrates how the queue works. For the purposes of this project however, I've ommitted these two services from running and included the queue producer and consumer within the backend. 

## Documentation
API Documentation can be found here: https://documenter.getpostman.com/view/395098/TVCgzT2S

## Features
List of features ready and TODOs for future development
* Create and authenticate admins
* Get all users
* Sign up a new user and create call
* Admin panel
* MySQL database with migrations

To-do list:
* Implement JWT as a form of authentication for authorized requests.
* Unit tests to be created.
* Input validation and sanization needs to be done.
* Change call flow to be programmatically defined for call status tracking.
* Implement websockets for real-time call status tracking.
* Create a join in between calls and customers to return more valuable information on the Calls table on the frontend admin panel.

## Extra Notes

Great resource for learning and setting up the db with sequelize. Although I used MySQL and this article uses PostGreSQL, all the concepts remain the same:
https://www.oriechinedu.com/posts/getting-started-with-sequelize-and-postgres

## Contact
Created by [@maraja](mailto:amit.maraj@gmail.com) - feel free to contact me!