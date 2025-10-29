import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Contenu principal */}
      <main className="container py-8 pt-22">
        <h1 className="text-3xl font-bold text-gray-900">Home</h1>
        <p className="mt-2 text-gray-600">
          Welcome to our online <span className="text-blue-600">Art Gallery</span>. Discover curated collections and immersive 3D exhibitions.
        </p>
        
        
        

      </main>
      <Footer />
    </div>
  )
}
