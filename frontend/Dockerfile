FROM node:12 as builder

WORKDIR /usr/src/docker-front-app
COPY ./package.json .
COPY ./pakcage-lock.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/docker-front-app/build /usr/share/nginx/html

