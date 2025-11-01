import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Artists() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-8 pt-22 flex-1">
        <h1 className="text-2xl font-bold">Artists</h1>
        <p>All the informations about the artits here.</p>
      </main>
      <Footer />
    </div>
  )
}
