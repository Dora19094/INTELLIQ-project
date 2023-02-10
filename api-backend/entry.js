//UNDER DEVELOPMENT
//DONT MIND ABOUT THIS CODE

// index.js
const app = require('./app');
const https = require('https');
const fs = require('fs');
const port = 3001

const options = {
  key: fs.readFileSync('./certification/server.key'),
  cert: fs.readFileSync('./certification/server.crt')
};

https.createServer(options, app)
  .listen(port, function () {
    console.log(`Express app listening on port ${port}`);
  });
