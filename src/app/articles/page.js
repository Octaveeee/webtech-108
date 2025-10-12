import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Link from 'next/link'

const articles = [
  { id: 1, title: 'First article : ......' },
  { id: 2, title: 'Secnod artcile : .....' },
  { id: 3, title: 'Third artcle : .......' },
]

export default function Articles() {
  return (
    <div>
      <Navbar />
      <h2>Articles</h2>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>
            <Link href={`/articles/${a.id}`}>{a.title}</Link>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  )
}
