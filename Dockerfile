FROM node:16.14

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --ignore-engines

COPY . .
RUN yarn run build

CMD ["yarn", "run", "start:prod"]