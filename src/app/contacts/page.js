import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function Contacts() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <Navbar />


      <main className="container py-8 pt-22 flex-1">
        <div className="flex flex-1 items-center justify-center px-6 py-16">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* textes*/}
            <div className="flex flex-col justify-center">
              <h1 className="text-6xl font-bold mb-4 text-center">Contact our team</h1>
              <p className="text-gray-300">
                You can send us a message using the form. We will get back to you as soon as possible.
              </p>
            </div>

            {/* form*/}
            <div className="bg-white dark:bg-[#24252a] text-black dark:text-white rounded-2xl p-8 shadow-xl">              
              <form className="flex flex-col space-y-4">
                
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" className="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Your name"/>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full rounded-lg px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Your email"/>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea className="w-full rounded-lg px-3 py-2 border border-gray-300 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black" placeholder="Write your message..."></textarea>
                </div>

                <button type="submit" className="mt-4 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
                  Send message
                </button>

              </form>
            </div>

          </div>
        </div>
      </main>



      
      <Footer />
    </div>
  )
}
