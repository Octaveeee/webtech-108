import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function About() {
  return (
    <div>
      <Navbar />
      <main className="container py-8">
        <h1 className="text-2xl font-bold">About</h1>
        <p>About page content here.</p>
      </main>
      <Footer />
    </div>
  )
}
