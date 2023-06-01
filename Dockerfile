
#choose the version of docker image you want to build on 
FROM node:17-alpine
#define directory of the app file 
WORKDIR /app
#copy the json file to install the required packages
COPY package.json .
#use this command to install the packages required
RUN npm install
#copy all the files in the project and place it in the app directory

COPY . .


EXPOSE 3000

CMD [ "npm" , "start"]








