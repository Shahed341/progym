# Use an official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend app files
COPY . .

# Expose development port
EXPOSE 3000

# Run React app in development mode (hot-reload)
CMD ["npm", "start"]
