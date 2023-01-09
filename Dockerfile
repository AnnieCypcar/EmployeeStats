FROM node:lts-alpine as build

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

EXPOSE 4000

COPY . .

CMD ["npm", "start"]