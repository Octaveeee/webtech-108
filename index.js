const express = require('express')
const app = express()
const port = 8080

// Middleware pour parser JSON si besoin plus tard
app.use(express.json())

// Routes de base
app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1><p>Use <a href="/hello?name=SAVEAUX">/hello?name=SAVEAUX</a></p>')
})

app.get('/hello', (req, res) => {
    const name = req.query.name
    if (name === 'SAVEAUX') {
        res.send('Bonjour je suis Octave SAVEAUX en ING4 CYBER INTER')
    } else {
        res.send('Hello ' + name)
    }
})

// Serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
