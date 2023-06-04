FROM node:16.15-alpine3.14 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY dist ./dist

RUN yarn install

EXPOSE $PORT
CMD ["yarn", "start"]