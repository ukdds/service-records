# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the NestJS app
RUN npm run build

# Use an official Postgres image as a parent image
FROM postgres:latest

# Set environment variables for the database and table
ENV POSTGRES_DB afmd
ENV POSTGRES_USER myuser
ENV POSTGRES_PASSWORD mypassword
ENV POSTGRES_INITDB_ARGS -E UTF8

# Copy the SQL file to the image
COPY init.sql /docker-entrypoint-initdb.d/

# Install Postgres and Redis clients
RUN apt-get update && \
    apt-get install -y postgresql-client redis-tools

# Expose port 5432 for Postgres
EXPOSE 5432

# Set environment variables for Postgres and Redis
ENV POSTGRES_HOST localhost
ENV POSTGRES_PORT 5432
ENV REDIS_HOST localhost
ENV REDIS_PORT 6379

# Start the NestJS app
CMD ["npm", "run", "start:prod"]
