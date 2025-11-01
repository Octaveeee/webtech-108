import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-8 pt-22 flex-1">
        <h1 className="text-2xl font-bold">About</h1>
        <p>About page content here.</p>
      </main>
      <Footer />
    </div>
  )
}
