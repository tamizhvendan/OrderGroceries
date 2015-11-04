FROM node:4.2.1-wheezy
RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 3000
CMD npm start
