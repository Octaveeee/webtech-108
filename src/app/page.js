import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Contenu principal */}
      <main className="container py-8 pt-22">
        <h1 className="text-3xl font-bold text-gray-900">Accueil</h1>
        <p className="mt-2 text-gray-600">
          Bienvenue dans site de mini jeu. <span className="text-blue-600">Explorez</span> nos mini jeux en 3D.
        </p>
        
        
        

      </main>
      <Footer />
    </div>
  )
}
