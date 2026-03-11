# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package.json only (if package-lock.json doesn't exist)
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000

# Run the app using serve
CMD ["npx", "serve", "-s", "build", "-l", "3000"]