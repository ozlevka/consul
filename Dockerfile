FROM ubuntu

RUN apt-get update && apt-get install --no-install-recommends -y curl npm

RUN npm install -g n && n 6.10.2

WORKDIR /app

COPY package.json /app
COPY service.js /app
COPY test-server.js /app


RUN npm install

CMD ["bash", "-c", "node test-server.js"]