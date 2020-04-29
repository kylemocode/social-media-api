FROM node:10-alpine

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY . /app

RUN npm install

CMD ["NODE_ENV=docker_development", "npm", "run", "dev"]