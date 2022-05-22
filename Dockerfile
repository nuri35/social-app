FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install && npm install nodemon
COPY . /usr/src/app  
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=4 CMD node healthcheck.js
EXPOSE 5000
ENTRYPOINT ["npm","start"] 
# ENTRYPOINT  you can not overwrite command you can only execucate  command example npm start vs vs  If you are going to overwrite it, it will take that command and add it next to it, for example, when you try to add 2 to the sleep command, it will add it next to it.
# when container run this cmd trigger   and you can overwrite this cmd