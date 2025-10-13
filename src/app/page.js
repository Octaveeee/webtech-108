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
        <Link 
          href="/scenes3d" 
          className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Play - Lancer la scène 3D
        </Link>
      </main>
      <Footer />
    </div>
  )
}
