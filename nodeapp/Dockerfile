FROM node:latest
WORKDIR /app
COPY package.json /app
COPY node_modules /app
#RUN npm install
COPY . /app
CMD node index.js
EXPOSE 8081
