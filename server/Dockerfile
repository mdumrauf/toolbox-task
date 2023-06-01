FROM node:14.21.3

WORKDIR /opt/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001

CMD [ "node", "index.js" ]
