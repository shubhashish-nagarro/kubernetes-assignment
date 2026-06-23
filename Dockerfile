# Build Stage
FROM node:14.20.1-alpine AS build

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the remaining application files to the working directory
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
# CMD ["node", "server.js"]
