const express = require('express')
const app = express()
const port = 8080

const db = {
    articles: [
      {
        id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        title: 'My article',
        content: 'Content of the article.',
        date: '04/10/2022',
        author: 'Liz Gringer'
      },
      // ...
    ],
    comments: [
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: 1664835049,
        content: 'Content of the comment.',
        articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        author: 'Bob McLaren'
      },
      // ...
    ]
  }

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

app.get('/articles', (req, res) => {
    res.json(db.articles)
})


app.post('/articles', (req, res) => {
    const article = req.body
    db.articles.push(article)
    res.status(201).json(article)
})

app.get('/articles/:articleId', (req, res) => {
    const article = db.articles.find(a => a.id === req.params.articleId)
    if (article) {
        res.json(article)
      } else {
        res.status(404).send('Article not found')
      }

})


app.get('/articles/:articleId/comments', (req, res) => {
    const comments = db.comments.filter(c => c.articleId === req.params.articleId)
    res.json(comments)
})

app.post('/articles/:articleId/comments', (req, res) => {
    const comment = req.body
    comment.articleId = req.params.articleId
    db.comments.push(comment)
    res.status(201).json(comment)
})

app.get('/articles/:articleId/comments/:commentId', (req, res) => {
    const comment = db.comments.find(c => c.id === req.params.commentId && c.articleId === req.params.articleId)
    if (comment) {
      res.json(comment)
    } else {
      res.status(404).send('Comment not found')
    }
})


// Serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
