FROM node:16.14

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn run build

CMD ["npm", "run", "start:prod"]