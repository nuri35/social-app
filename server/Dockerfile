FROM node:15
RUN npm install --global nodemon
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
ARG NODE_ENV
RUN if ["$NODE_ENV" = "development"]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . /usr/src/app  
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=4 CMD node healthcheck.js
EXPOSE 5000
CMD ["npm", "start"]
