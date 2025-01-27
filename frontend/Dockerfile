# Build stage: Uses Node.js 18 as the base image for building the Angular application
FROM node:18 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
# Install project dependencies using npm
COPY package*.json ./
RUN npm install

# Copy the entire project source code to the container
# Build the Angular application using the production configuration
COPY . .
RUN npm run build

# Production stage: Uses lightweight nginx alpine image for serving the application
FROM nginx:alpine

# Clean up the default nginx static files to prepare for our built application
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular application from the build stage
# Places files in nginx's serving directory
COPY --from=build /usr/src/app/dist/frontend/browser /usr/share/nginx/html

# Copy custom nginx configuration for the application
# Overrides the default nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 4200 for HTTP traffic
EXPOSE 4200

# Start nginx in the foreground
# daemon off ensures Docker can track the process properly
CMD ["nginx", "-g", "daemon off;"]