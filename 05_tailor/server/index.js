'use strict';

const express = require('express')
const Tailor = require('node-tailor')
const fs = require('fs')
const tailor = new Tailor({templatesPath: `${__dirname}/templates/`});
const app = express();
const productServer = express();
const userServer = express();
const videoServer = express();

app.use(tailor.requestHandler);

const streamFragment = (filename, response) => {
  fs.readFile(`${__dirname}/fragments/${filename}.html`, (error, data) => {
    if(error) {
      console.error(error);
      throw error;
    }
    response.write(data);
    response.end();
  })
}

//Tailor Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Tailor listening on port ${port}...`));

//Product Fragment Server
productServer.get('/', (request, response) => {
  console.log(request.url);
  streamFragment('product', response);
});

const productPort = process.env.PORT || 5001;
productServer.listen(productPort, () => console.log(`Product fragment server listening on port ${productPort}...`));


//User Fragment Server
userServer.get('/', (request, response) => {
  console.log(request.url);
  streamFragment('user', response);
});

const userPort = process.env.PORT || 5002;
userServer.listen(userPort, () => console.log(`User fragment server listening on port ${userPort}...`));


//Video Fragment Server
videoServer.get('/', (request, response) => {
  console.log(request.url);
  streamFragment('video', response);
});

const videoPort = process.env.PORT || 5003;
videoServer.listen(videoPort, () => console.log(`Video fragment server listening on port ${videoPort}...`));
