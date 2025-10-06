import Navbar from './components/navbar'
import Header from './components/header'
import Footer from './components/footer'

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <main>
        <h2>Titre h2 pour le lab</h2>
        <p>Discover articles Web technologies.</p>
      </main>
      <Footer />
    </div>
  )
}
