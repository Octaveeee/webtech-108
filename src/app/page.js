import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Contenu principal - prend tout l'espace disponible */}
      <main className="flex-1 container py-8 pt-22 flex flex-col justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Accueil</h1>
          <p className="mt-2 text-gray-600">
            Bienvenue dans notre galerie d'art virtuelle. <span className="text-blue-600">Explorez</span> nos œuvres en 3D.
          </p>
          <Link 
            href="/scenes3d" 
            className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Play - Lancer la scène 3D
          </Link>
        </div>
      </main>

      {/* Footer - toujours en bas */}
      <Footer />
    </div>
  )
}