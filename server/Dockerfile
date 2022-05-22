FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && npm install nodemon
COPY . /usr/src/app  
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=4 CMD node healthcheck.js
EXPOSE 5000
ENTRYPOINT ["npm","start"] 