<h1 align="center">Real time social media app 👋</h1>
<p align="center">

  <a href='https://d0b4-212-253-219-66.eu.ngrok.io/job/social%20app/'>
  <img src='https://d0b4-212-253-219-66.eu.ngrok.io/buildStatus/icon?job=social+app'>
  </a>
  <a href="https://github.com/kefranabg/readme-md-generator/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://codecov.io/gh/kefranabg/readme-md-generator">
    <img src="https://codecov.io/gh/kefranabg/readme-md-generator/branch/master/graph/badge.svg" />
  </a>
  <a href="https://github.com/frinyvonnick/gitmoji-changelog">
    <img src="https://img.shields.io/badge/changelog-gitmoji-brightgreen.svg" alt="gitmoji-changelog">
  </a>
 
</p>

## Table of Contents

- - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Setup](#setup)
  - [Setup sequelize database](#setup-sequelize-database)
  - [Contact](#contact)

## Technologies Used

<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="redis" width="40" height="40"/> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="express" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" alt="redis" width="40" height="40"/>
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg" alt="redis" width="40" height="40"/>
<img src="https://www.vectorlogo.zone/logos/chaijs/chaijs-ar21.svg" alt="redis" width="40" height="40"/>
<img src="https://www.vectorlogo.zone/logos/mochajs/mochajs-icon.svg" alt="redis" width="40" height="40"/>

## Features

List the ready features here:

- mongo db Database and data type,mongoose orm
- Node js crud process and real time application with socket io npm
- React, redux
- redis cache and session storage
- proxy nginx
- dockerize application
- real express structure

### I. Commonly used commands in docker-compose-dev:

1. Build and rebuild a image.

   - `docker-compose up --build`
   - `docker-compose -f "docker-compose.dev.yml" up --build`

2. Run and start containers.

   - `docker-compose up`
   - `docker-compose -f "docker-compose.dev.yml" up`

3. Stop and clear containers.

   - `docker-compose down`
   - `docker-compose -f "docker-compose.dev.yml" down`

4. Stop and clear containers, volumes.

   - `docker-compose down -v`
   - `docker-compose -f "docker-compose.dev.yml" down -v`

### II. Commonly used commands in docker-compose-prod:

1. Build and rebuild a image.

   - `docker-swarm init `
   - `docker stack ls`
   - `docker service ls`
   - `docker stack deploy -c docker-compose.prod.yaml name`
   - `docker image build --tag nurettinsenbackend/server --build-arg NODE_ENV=production .`
   - `docker push nurettinsenbackend/client`

## Setup app

```sh
npm init -y
npm install
npm run dev => backend and socket folder
npm start => client folder
```

## Setup nginx main

```sh
upstream client {
	server frontend:3000;
}

upstream api {
	server backend:5000;
}



server {
	listen 80;
	listen [::]:80;

	server_name _;
	location / {
		proxy_pass http://client;
	}

	location /sockjs-node {
		proxy_pass http://client;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "Upgrade";
  }

	location /api/ {
		proxy_pass http://api;
	}

	location /socket.io {
	 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host;

      proxy_pass http://socket:6500;

      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
	}



}
```

## Author

👤 **Nurettin Şen**

- Linkedin: [@nurettin-sen](https://www.linkedin.com/in/nurettin-sen/)
- Github: [@nuri35](https://github.com/nuri35)
