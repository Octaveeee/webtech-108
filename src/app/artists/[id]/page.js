import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Article({ params }) {
  const { id } = params

  return (
    <div>
      <Navbar />
      <h2>Article #{id}</h2>
      <p>This is a detailed article about topic #{id}.</p>
      <Footer />
    </div>
  )
}
