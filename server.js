const server = require('express')();
const request = require('request');
const path = require('path');

const host = 'localhost';
const port = 3000;

server.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
})

server.listen(port, () => {
  console.log(`Server running @ http://${host}:${port}`)
})
