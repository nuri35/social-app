FROM node:14
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && npm install nodemon
COPY . /usr/src/app
EXPOSE 3000
ENTRYPOINT ["npm","start"] 

