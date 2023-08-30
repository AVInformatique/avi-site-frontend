FROM node:18.12.1-alpine
RUN mkdir -p /usr/src/app
COPY . /usr/src/app/

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN npm install

CMD npm start