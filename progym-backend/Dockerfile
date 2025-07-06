# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (includes nodemon from devDependencies)
RUN npm install

# Copy all backend files
COPY . .

# Expose the backend port
EXPOSE 5000

# Start the server using the dev script with nodemon
CMD ["npm", "run", "dev"]
