# Stage 1: install dependencies and build
FROM node:20.10-alpine AS build

WORKDIR /app

# Copy only the necessary files for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .


# Install only production dependencies
RUN npm install --production

# Generate Prisma Client during the build
RUN npx prisma generate

# Build the application
# RUN npm run build

# Stage 2: create a smaller image for production
FROM node:20.10-alpine AS production

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]