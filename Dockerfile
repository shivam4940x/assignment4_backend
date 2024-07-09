# Step 1: Use the official Bun image as the base image
FROM oven/bun:1 AS base

# Step 2: Set the working directory inside the Docker image
WORKDIR /usr

# Step 3: Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN bun install

# Step 4: Copy the rest of the application files
COPY . .
# RUN bun run db

# Step 6: Expose the port the app runs on
EXPOSE 3000

# Step 7: Command to run the application
CMD ["bun", "start"]
