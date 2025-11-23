'use client'

import { useState } from 'react'
import { Mail, Phone} from 'lucide-react'
import { FaLinkedinIn, FaGithub} from 'react-icons/fa'
import { FaMapLocation } from "react-icons/fa6"

export default function Contacts() {
  // form inputs
  const [formData, setFormData] = useState({name: '', email: '',message: ''})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // send data to contact api
      const response = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(formData),})

      const data = await response.json()

      // error
      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi')
      }

      // success : clear form
      setSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      
      // hide success after 5 seconds
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="container mx-auto py-4 pt-20 flex-1">
        <div className="flex flex-1 items-center justify-center px-6 py-8">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-40">

            {/* textes*/}
            <div className="flex flex-col justify-center">
              <h1 className="text-6xl font-bold mb-4 text-center">Contact our team</h1>
              <p className="text-gray-300">
                 You can send us a message using the form. We will get back to you as soon as possible.
              </p>
            </div>

            {/* form*/}
            <div className="bg-white dark:bg-[#24252a] text-black dark:text-white rounded-2xl p-8 shadow-xl">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                {/* name input */}
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                    className="w-full rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" 
                    placeholder="Your name" 
                  />
                </div>

                {/* email input */}
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                    className="w-full rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" 
                    placeholder="Your email" 
                  />
                </div>

                {/* message */}
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required
                    className="w-full rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" 
                    placeholder="Write your message..."
                  />
                </div>

                {/* error */}
                {error && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* success*/}
                {success && (
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 rounded-lg text-sm">
                    Message envoyé avec succès !
                  </div>
                )}

                {/* submit button */}
                <button type="submit" disabled={loading}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Envoi en cours...' : 'Send message'}
                </button>

              </form>
            </div>


            {/* séparateur */}
            <div className="md:col-span-2 flex items-center justify-center gap-6">
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
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900/50 transition">
                    <FaLinkedinIn size={24} />
                  </a>

                  <a 
                    href="https://github.com/Octaveeee" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
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
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-900/50 transition">
                    <FaLinkedinIn size={24} />
                  </a>

                  <a 
                    href="https://github.com/Martin-brl" target="_blank" rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
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

              {/* address */}
              <a className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <FaMapLocation size={24} className="text-blue-600 dark:text-blue-400" />
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Location</p>
                    <p className="text-gray-900 dark:text-white">10 Rue Sextius Michel, 75015 Paris</p>
                  </div>
              </a>

              {/* google maps frame*/}
              <div className="rounded-lg overflow-hidden shadow-lg h-[400px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d928.2150809961709!2d2.288275519773876!3d48.85079763772761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6701b4f58251b%3A0x167f5a60fb94aa76!2sECE%20-%20Ecole%20d&#39;ing%C3%A9nieurs%20-%20Campus%20de%20Paris!5e0!3m2!1sfr!2sfr!4v1762626827827!5m2!1sfr!2sfr" 
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
