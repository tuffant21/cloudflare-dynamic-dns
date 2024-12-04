FROM node:22-slim AS build

RUN apt update && apt upgrade -y

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY tsconfig.json .
COPY src src

RUN npm run build

USER node

ENTRYPOINT ["node", "./build/app.js"]
