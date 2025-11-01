import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Galleries() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container py-8 pt-22 flex-1">
        <h1 className="text-2xl font-bold">Galleries</h1>
        <p>All the 3D galleries here.</p>
        <h1>The first one here :</h1>
        <Link 
          href="/scenes3d" 
          className="mt-6 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Play 3D
        </Link>
      </main>
      <Footer />
    </div>
  )
}
