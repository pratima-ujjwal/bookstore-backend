# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./
COPY . .

# Install dependencies
RUN npm install

# Build TypeScript (optional if ts-node-dev is used)
# RUN npm run build

# Expose port
EXPOSE 4000

# Run in dev mode
CMD ["npm", "run", "dev"]