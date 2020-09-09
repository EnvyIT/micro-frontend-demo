FROM node:14.9.0-alpine
WORKDIR /usr/app
COPY . .
RUN npm install --quiet
ENTRYPOINT npm run-script start
