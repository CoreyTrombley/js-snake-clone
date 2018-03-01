const express = require('express');
const server = express();
const request = require('request');
const path = require('path');

const host = 'localhost';
const port = 3000;

server.use(express.static(path.join(__dirname, 'dist')));
server.listen(port, () => {
  console.log(`Server running @ http://${host}:${port}`)
})
