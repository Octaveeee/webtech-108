import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Mail, Phone, MapPin } from 'lucide-react'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'


export default function Contacts() {
  

  
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <Navbar />


      <main className="container py-4 pt-20 flex-1">
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <div className="max-w-5xl w-full grid grid-cols-2 grid-rows-3 gap-x-20 gap-y-0">

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


            {/* séparateur*/}
            <div className="col-span-2 flex items-center justify-center gap-6">
              <div className="flex-1 h-px bg-gray-600"></div>
              <h1 className="text-3xl">or</h1>
              <div className="flex-1 h-px bg-gray-600"></div>
            </div>



            {/* infos*/}
            <div className="bg-white dark:bg-[#24252a] text-black dark:text-white rounded-2xl p-8 shadow-xl">    
              <h3 className="text-2xl font-bold mb-6 text-center">
                Contact details
              </h3>


              {/* Octave SAVEAUX*/}
              <div className="space-y-4">
                <a href="mailto:octave.saveaux@edu.ece.fr" className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <Mail size={24} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <p className="text-gray-900 dark:text-white">octave.saveaux@edu.ece.fr</p>
                  </div>
                </a>
                                
                <a href="tel:+33647933205" className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <Phone size={24} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                    <p className="text-gray-900 dark:text-white">+33 6 47 93 32 05</p>
                  </div>
                </a>

                <div className="flex items-center justify-center gap-4 py-2">
                  <a 
                    href="https://www.linkedin.com/in/octave-saveaux" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                  >
                    <FaLinkedinIn size={24} />
                  </a>

                  <a 
                    href="https://github.com/Octaveeee" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>


                {/* séparateur*/}
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">and</span>
                  <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
                </div>



                {/* Martin BRULEY*/}
                <a href="mailto:martin.bruley@edu.ece.fr" className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <Mail size={24} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</p>
                    <p className="text-gray-900 dark:text-white">martin.bruley@edu.ece.fr</p>
                  </div>
                </a>
                                
                <a href="tel:+33783738742" className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <Phone size={24} className="text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                    <p className="text-gray-900 dark:text-white">+33 7 83 73 87 42</p>
                  </div>
                </a>

                <div className="flex items-center justify-center gap-4 py-2">
                  <a 
                    href="https://www.linkedin.com/in/martin-bruley-b8312b2ba/" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                  >
                    <FaLinkedinIn size={24} />
                  </a>

                  <a 
                    href="https://github.com/Martin-brl" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    <FaGithub size={24} />
                  </a>
                </div>
              </div>

            </div>


        
            {/* map*/}  
            <div className="bg-white dark:bg-[#24252a] text-black dark:text-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Our location
              </h3>


            
            </div>


          </div>
        </div>
      </main>



      
      <Footer />
    </div>
  )
}
