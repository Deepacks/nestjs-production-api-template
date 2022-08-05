FROM node:16.15.1-alpine3.16

WORKDIR /usr/src/app

COPY package.json package.json

RUN yarn --prod && yarn cache clean --force

COPY . .

RUN yarn build

CMD [ "yarn", "start:prod" ]