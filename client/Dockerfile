FROM node:20

WORKDIR /arcube/client
# Copy only package.json and package-lock.json
COPY package*.json .
# Install dependencies
RUN npm install
# Copy the rest of the application
# if you find the copy commented out that means that we're using volumes mounting to simulate prod env
COPY . .


EXPOSE 80