FROM node:16

WORKDIR /currency_client

COPY package.json ./

COPY package-lock.json ./

COPY ./ ./

RUN npm install

CMD ["npm", "start"]