FROM node:14
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && npm install nodemon
COPY . /usr/src/app  
EXPOSE 6500
ENTRYPOINT ["npm","start"] 