FROM node:12

WORKDIR /usr/src/docker-backend-app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "run", "start"]