const url = require('url')
const qs = require('querystring')
const fs = require('fs')
const pathModule = require('path')

module.exports = {
  serverHandle: function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)

    if (path === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write('<h1>Welcome</h1>')
        res.write('<p>Use <a href="http://localhost:8080/hello?name=SAVEAUX">http://localhost:8080/hello?name=SAVEAUX</a></p>')
        res.end()
        return
    }

    if (path === '/hello' && params.name) {
        res.writeHead(200, {'Content-Type': 'text/plain'})
        if (params.name === 'SAVEAUX') {
            res.write('Bonjour je suis Octave SAVEAUX en ING4 CYBER INTER')
        } else {
            res.write('Hello ' + params.name)
        }
        res.end()
        return
    }

    // Route /about
    if (path === '/about') {
        const aboutData = require(pathModule.join(__dirname, 'content', 'about.json'))
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(aboutData))
        res.end()
        return
    }

    // Dynamic routing: vérifier si un fichier JSON existe dans content
    const filePath = pathModule.join(__dirname, 'content', path.substring(1) + '.json')
    if (fs.existsSync(filePath)) {
        const fileData = require(filePath)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(fileData))
        res.end()
        return
    }

    // sinon erreur 404
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.write('404 Not Found')
    res.end()
  }
}
