FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json separately
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy all source files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
