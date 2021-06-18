# pull the base image
FROM node:lts
# create app directory
WORKDIR /app
# copy package file
COPY package*.json /app
# install dependencies
RUN npm install
# add app
COPY . /app
# run build
RUN npm run build
# start app
ENTRYPOINT ["npm", "start"]
EXPOSE 8080