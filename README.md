# Project Overview

## Table of Contents
- Introduction
- Project Structure
  - Root Directory
  - Client Directory
  - ms_shortener Directory
- Setup and Installation
- Running the Project
- Contributing
- License

## Introduction
This project consists of a frontend application built with React and TypeScript, and a backend application built with Node.js and TypeScript. The project uses Docker for containerization and MongoDB for data storage. the idea is that it's an application that shorten out urls and offers the generation of a Qr code and a custom paths.
## requirements
you need to  have at least  `docker compose v2.29.X` you don't need node js  because of the containerization however if you desire you must have at least
node js 20.X
## Project architecture

This project consists of multiple services that work together to provide a URL shortening application. The architecture is defined using Docker Compose, which allows for easy orchestration and management of the services.

## Services

### 1. Frontend

- **Container Name:** `arcube_client`
- **Build Context:** `./client`
- **Dockerfile:** `Dockerfile` |  `Dockerfile.prod` for the the production environment
- **Volumes:**
  - `./client:/arcube/client`
- **Ports:**
  - `80:80`
- **Command:** `npm run watch` for development environment otherwise nginx will be used as the webserver
- **Restart Policy:** `always`
- **Networks:**
  - `arcube-network`

The frontend service is responsible for serving the client-side application with `React ts`. It uses a Dockerfile to build the application and maps the local `./client` directory to the container. The service runs on port 80 and restarts automatically if it fails.

### 2. MongoDB

- **Image:** `mongo:latest`
- **Ports:**
  - `27017:27017`
- **Volumes:**
  - `./mongodb/mongo_data:/data/db`
  - `./mongodb/init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js`
- **Environment Variables:**
  - `MONGO_INITDB_DATABASE: arcube`
  - `MONGO_INITDB_ROOT_USERNAME: root_user`
  - `MONGO_INITDB_ROOT_PASSWORD: root_password`
  - `MONGO_ADMIN: database_user`
  - `MONGO_ADMIN_PASSWORD: database_user_password`
- **Networks:**
  - `arcube-network`

The MongoDB service provides the database for the application. It uses the latest MongoDB image and maps the local `./mongodb/mongo_data` directory to the container for data persistence. The service is configured with environment variables for the initial database setup and credentials.

### 3. Mongo Express

- **Image:** `mongo-express:latest`
- **Ports:**
  - `27018:8081`
- **Environment Variables:**
  - `ME_CONFIG_MONGODB_ADMINUSERNAME: root_user`
  - `ME_CONFIG_MONGODB_ADMINPASSWORD: root_password`
  - `ME_CONFIG_MONGODB_URL: mongodb://root_user:root_password@mongodb:27017/`
  - `ME_CONFIG_BASICAUTH: false`
- **Depends On:**
  - `mongodb`
- **Restart Policy:** `always`
- **Networks:**
  - `arcube-network`

Mongo Express is a web-based MongoDB admin interface. It connects to the MongoDB service using the provided credentials and runs on port 27018. The service depends on MongoDB and restarts automatically if it fails.

### 4. URL Shortener Microservice

- **Container Name:** `arcube_ms_shortner`
- **Build Context:** `./ms_shortener/.`
- **Dockerfile:** `Dockerfile`
- **Ports:**
  - `5000:5000`
- **Command:** `npm run watch`
- **Restart Policy:** `always`
- **Depends On:**
  - `mongodb`
- **Environment Variables:**
  - `DB_MONGODB_HOST: mongodb`
  - `DB_MONGODB_PORT: 27017`
  - `DB_USERNAME: root_user`
  - `DB_PASSWORD: root_password`
  - `DB_MONGODB_NAME: arcube`
  - `PORT: 5000`
- **Volumes:**
  - `./ms_shortener:/arcube/service`
- **Networks:**
  - `arcube-network`

The URL Shortener Microservice handles the URL shortening logic. It builds the service from the `./ms_shortener` directory and runs on port 5000. The service depends on MongoDB and is configured with environment variables for database connection.

## Networks

- **arcube-network:**
  - **Driver:** `bridge`

All services are connected through the `arcube-network`, which uses the bridge driver to enable communication between containers.


## Project Structure

### Root Directory
- **docker-compose.yml**: Configuration for Docker Compose to manage multi-container Docker applications in development.
- **docker-compose-prod.yml**: Configuration for Docker Compose to manage multi-container Docker applications in production.
- **mongodb/**: Directory containing MongoDB initialization scripts and data storage.

### Client Directory
This directory contains the frontend code for your project, built with React and TypeScript.

- **Dockerfile**: Dockerfile for building the frontend development environment.
- **Dockerfile.prod**: Dockerfile for building the frontend production environment.
- **nginx.conf**: Nginx configuration file for serving the frontend.
- **package.json**: NPM configuration file listing dependencies and scripts.
- **public/**: Directory for static assets like HTML, icons, and manifest files.
- **src/**: Directory for source code,
- **tsconfig.json**: TypeScript configuration file.

Inside the `src` folder, you'll find these folders:

- **components**: The components folder.
- **enums**: The enums folder that contains various enumerations.
- **hooks**: The folder of custom hooks.
- **index.tsx**: The main entry point of the application.
- **pages**: The folder that contains the root pages, such as the home page and redirect page.
- **services**: The list of services that are available, including API calls.
- **store**: The Redux Toolkit store that contains the declaration of reducers and the APIs.
  - **api**: The actual declaration of the APIs.
  - **reducer**: The reducer declaration.
- **types**: The folder that contains application types.
- **utils**: The folder that contains extra functionalities that are crucial to the system but don't belong to any specific theme to be a service.

### ms_shortener Directory
This directory contains the backend code for your project, built with Node.js and TypeScript.
- **Dockerfile**: Dockerfile for building the backend development environment.
- **Dockerfile.prod**: Dockerfile for building the backend production environment.
- **jest.config.ts**: Configuration file for the Jest testing framework.
- **log/**: Directory for log files.
- **package.json**: NPM configuration file listing dependencies and scripts.
- **src/**: Directory for source code, including configuration, controllers, database connections, error handling, internationalization, middleware, models, routes, services, and utilities.

Inside the `src` folder, you'll find these directories and files:

- **config**: Contains configuration files for the application.
  - **environment.config.ts**: Configuration for different environments (e.g., development, production).

- **controller**: Contains controller files that handle incoming requests and return responses.
  - **url.controller.ts**: Controller for URL-related operations.

- **db**: Contains database connection and configuration files.
  - **db_mongo.ts**: MongoDB configuration and connection setup.

- **errors**: Contains files for error handling.
  - **appError.ts**: Custom application error class.
  - **errorHandler.ts**: Middleware for handling errors.
  - **Error.ts**: General error handling utilities.
  - **http.ts**: HTTP-specific error handling.

- **i18n**: Contains internationalization files.
  - **messages.eng.ts**: English messages for internationalization.

- **index.ts**: The main entry point of the backend application.

- **log**: Contains logging configuration files.
  - **config.ts**: Configuration for logging.

- **middleware**: Contains middleware functions.
  - **errors.ts**: Middleware for handling errors.

- **models**: Contains database models.
  - **urls.model.ts**: Model for URL data.

- **routes**: Contains route definitions.
  - **url.route.ts**: Routes for URL-related operations.

- **services**: Contains service files that implement business logic.
  - **url.service.ts**: Service for URL-related operations.
  - **url.service.test.ts**: Tests for the URL service.

- **types**: Contains TypeScript type definitions.
  - **IDayjs.interface.ts**: Types for Day.js.
  - **IService.interface.ts**: Types for services.
  - **IUrl.interface.ts**: Types for URLs.

- **utils**: Contains utility functions that are crucial to the system but don't belong to any specific theme.
  - **catchAsync.ts**: Utility function for catching async errors.
  - **dayjs.ts**: Utility functions for Day.js.



- **tsconfig.json**: TypeScript configuration file.


#### Installation
install docker and nodejs
docker : https://docs.docker.com/engine/install/ubuntu/
nodejs (optional) :
```bash
sudo apt update
cd ~
curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt install nodejs

```
clone the folder
```bash
   git clone  https://github.com/khalilbsd/arcube.git
   ```
##### development mode
  ```bash
  cd client && npm i
  cd ms_shortener && npm i
  ```
if you find the need to declare a local dns you can edit the file `client/.env.local` to alter the variables `REACT_APP_SERVER_URL` and `REACT_APP_DOMAIN` accordingly.
you need to configure the  database variables in docker-compose.

```bash
vim docker-compose.yml
```
run the  application
```bash
docker compose up  mongodb -d
docker compose up -d
```

##### production mode
you need to configure the  database variables in docker-compose-prod.yml
```bash
vim docker-compose-prod.yml
```
run the  application
```bash
docker compose -f docker-compose-prod mongodb  up -d
docker compose -f docker-compose-prod  up -d
```
### Testing
to launch the backend tests  you simply run :
```bash
docker exec -it arcube_ms_shortner bash
npm run test
```

## API Documentation
### 1. Get Original URL

**Endpoint:** `/api/v0/:shortenedID`

**Method:** `GET`

**Description:** Retrieves the original URL corresponding to the given shortened ID.

**Request Parameters:**
- `shortenedID` (path parameter): The ID of the shortened URL.

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "Original URL retrieved successfully",
    "originalUrl": "http://example.com"
  }
  ```
  **Error (404):**
  ```json

  {
    "status": "fail",
    "message": "Invalid URL format",
    "error": {
        "name": "ArCubeAppError",
        "code": 400,
        "status": "fail",
        "message": "Invalid URL format",
        "statusCode": 400
    }
  }
  ```
  **Error (500):**
  ```json
  {
    "status": "fail",
    "message": "we are sorry but something went please try again later",
    "error": {
        "name": "ArCubeAppError",
        "code": 400,
        "status": "fail",
        "message": "Invalid URL format",
        "statusCode": 400
    }
  }
  ```

### 2. Shorten URL

**Endpoint:** `/api/v0/shorten`

**Method:** `POST`

**Description:** Shortens a given URL, with an optional custom alias.

**Request Body:**
- `url` (required): The original URL to be shortened.
- `customUrl` (optional): A custom alias for the shortened URL.

**Response:**
- **Success (200):**
  ```json
  {
    "success": true,
    "message": "your shortened url is ready to use",
    "shortenedUrl": "the id of the shortened url"
  }
- **Error (400):**
  ```json
  {
    "status": "fail",
    "message": "Invalid custom path. the path must not be an url",
    "error": {
        "name": "ArCubeAppError",
        "code": 400,
        "status": "fail",
        "message": "Invalid URL format",
        "statusCode": 400
    }
  }
  ```
  ```json
  {
    "status": "fail",
    "message": "Invalid custom path. the path must not be an url",
    "error": {
        "name": "ArCubeAppError",
        "code": 400,
        "status": "fail",
        "message": "Invalid URL format",
        "statusCode": 400
    }
  }
  ```
  ```json
  {
    "status": "fail",
    "message": "The custom url is already used",
    "error": {
        "name": "ArCubeAppError",
        "code": 400,
        "status": "fail",
        "message": "Invalid URL format",
        "statusCode": 400
    }
  }
  ```
  ```json
  {
    "success": true,
    "status": "fail",
    "message": "URL is missing from the request",
    "error": {
        "name": "ArCubeAppError",
        "code": 400,
        "status": "fail",
        "message": "Invalid URL format",
        "statusCode": 400
    }
  }
  ```
- **Error (500):**

  ```json
  {
    "success": true,
    "status": "fail",
    "message": "we are sorry but something went wrong please try again later",
    "error": {
        "name": "ArCubeAppError",
        "code": 500,
        "status": "fail",
        "message": "Invalid URL format",
        "statusCode": 500
    }
  }
  ```

