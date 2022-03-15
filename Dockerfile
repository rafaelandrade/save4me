FROM node:14-alpine

WORKDIR /usr/app
ENV port=5004
EXPOSE 5004

ADD ./package.json .
RUN npm install

RUN npm i -g nodemon

ADD . .

CMD npm start
