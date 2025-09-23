const url = require('url')
const qs = require('querystring')
const http = require('http')

const serverHandle = function (req, res) {
  // Retrieve and print the queryParams
  const queryParams = qs.parse(url.parse(req.url).query)
  console.log(queryParams)
  const content = JSON.stringify(queryParams)

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(content)
  res.end()
}

http
.createServer(serverHandle)
.listen(8080)
