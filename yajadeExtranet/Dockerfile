# base image
FROM node:latest
RUN  mkdir -p  /user/src/app
# set working directory
WORKDIR /user/src/app

# install and cache app dependencies
COPY package.json /user/src/app/
#COPY node_modules /user/src/app
#COPY node_modules /user/src/app/
RUN npm install


ADD public /user/src/app/public
ADD src /user/src/app/src


RUN npm build

# start app
CMD ["npm", "start"]
