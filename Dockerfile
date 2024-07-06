# Use the official Node.js image as the base image
FROM node:18 

# Set the working directory
WORKDIR /usr/src/app

# Install build dependencies
RUN apk add --no-cache python make g++

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env .env

# Rebuild bcrypt for Alpine Linux
RUN npm rebuild bcrypt --build-from-source

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["npm", "run", "start:dev"]
