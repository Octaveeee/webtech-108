import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <nav className="container flex h-14 items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="h-6 w-6 rounded bg-blue-600" aria-hidden="true" />
            <span className="text-lg font-semibold text-gray-900">Art Gallery</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">
              About
            </Link>
            <Link href="/contacts" className="text-gray-700 hover:text-blue-600">
              Contacts
            </Link>
          </div>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="container py-8 pt-22">
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
      </main>
    </div>
  )
}