FROM node:18.15.0-alpine3.17

RUN npm install --location=global npm && \
    npm install --location=global pnpm \
    pnpm i -g @nestjs/cli

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

RUN pnpm build && \
    rm -rf src node_modules pnpm-lock.yaml && \
    pnpm i --prod && pnpm store prune

CMD [ "pnpm", "start:prod" ]