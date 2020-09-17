"use strict";

const express = require('express');
const app = express();

const path = __dirname + "/elements/";

app.use(express.static("elements"));

app.get("/chart.js", (request, response) => {
  response.sendFile(`${path}chart.js`);
});

const port = process.env.PORT || 5050;
app.listen(port, () =>
  console.log(`Fragment Server listening on port ${port}...`)
);
