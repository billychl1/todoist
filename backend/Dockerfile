# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container to /usr/src/app
# This means that all subsequent commands will be run relative to this directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) into the working directory
# This is done so we can install the dependencies in the next step
COPY package*.json ./

# Run npm install to install the dependencies listed in the package.json
# This command is run inside the container to ensure that all dependencies are available
RUN npm install

# Copy the rest of the application’s source code into the container
# This includes all the application files, which will be used to build and run the application
COPY . .

# Build the project using the npm run build command
# This is typically used to compile TypeScript, bundle assets, or do other pre-run tasks
RUN npm run build

# Expose port 3000 on the container to allow traffic to reach the app from the outside
# This is the port that the application will be listening on
EXPOSE 3000

# Set the default command to start the application when the container runs
# This will run the 'npm start' script, which typically starts the application server
CMD ["npm", "start"]
