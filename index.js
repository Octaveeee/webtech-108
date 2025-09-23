// index.js
const http = require('http');

const PORT = process.env.PORT || 8080;

const serverHandle = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
};

http
  .createServer(serverHandle)
  .listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
