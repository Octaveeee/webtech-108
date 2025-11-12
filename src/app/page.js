import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <Navbar />
      <main className="pt-5 flex-1">
        <section className="container mx-auto px-6 pt-20 pb-8 md:pt-32 md:pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Aurora Art Gallery
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Welcome to our online <span className="text-blue-400 font-semibold">Art Gallery</span>. 
              Discover curated collections and immersive 3D exhibitions.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Artists Card */}
            <Link href="/artists" className="group">
              <div className="bg-[#24252a] rounded-lg p-8 border border-gray-700 hover:border-gray-600 transition h-full">
                <div className="text-4xl mb-4">🎨</div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition">Artists</h2>
                <p className="text-gray-400">
                  Discover talented artists and their remarkable works from around the world.
                </p>
              </div>
            </Link>

            {/* Galleries Card */}
            <Link href="/galleries" className="group">
              <div className="bg-[#24252a] rounded-lg p-8 border border-gray-700 hover:border-gray-600 transition h-full">
                <div className="text-4xl mb-4">🖼️</div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition">Galleries</h2>
                <p className="text-gray-400">
                  Browse through our curated collection of 3D art galleries and exhibitions.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* About Preview Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Our Gallery</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              This project was developed as part of the Web Technologies course at ECE Paris. 
              It showcases modern web development practices and immersive 3D experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/about"
                className="inline-block px-6 py-2 text-blue-400 hover:text-blue-300 border border-blue-600 rounded-lg transition"
              >
                Learn More
              </Link>
              <Link 
                href="/contacts"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
