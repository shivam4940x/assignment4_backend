# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /usr/src/app
ARG DB_url
#install
COPY package.json bun.lockb ./
COPY src/database ./src/database
RUN bun install
COPY . .
RUN bun run build
ENV NODE_ENV=production
CMD [ "bun", "run", "start" ]