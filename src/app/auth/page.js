'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { supabase } from '@/lib/supabaseClient'

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // form state
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)


  // verify if login or register (from the navbar)
  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'register') {
      setIsSignUp(true)
    } else if (mode === 'login') {
      setIsSignUp(false)
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            // redirection to the page callback (only if confirmation email is true on supabase)
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              name: name,
            },
          },
        })
        
        if (error) throw error
        
        // create profile 
        if (data.user) {
          const profileData = {
            user_id: data.user.id,
            name: name,
          }
          
          if (birthDate && birthDate.trim() !== '') {
            profileData.birth_date = birthDate
          }
          
          const { error: profileError, data: profileResult } = await supabase
            .from('profiles')
            .insert(profileData)
          
          if (profileError) {
            throw new Error(`Failed to create profile: ${profileError.message}`)
          }
        }
        
        setSuccess("Account created successfully!")
        setName('')
        setEmail('')
        setPassword('')
        setBirthDate('')
        
        // redirect to auth page login mode
        setTimeout(() => {
          router.push('/auth?mode=login')
          router.refresh()
        }, 2000)
        
      } else {
        // login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (error) throw error
        
        setSuccess("Login successful!")
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 2000)
      }
    } catch (error) {
      // all the erros
      let message = "An error occurred"
      if (error.message.includes('Email not confirmed')) {
        message = "Please confirm your email before logging in"
      } else if (error.message.includes('Invalid login credentials')) {
        message = "Invalid email or password"
      } else if (error.message.includes('Email already registered')) {
        message = "This email is already registered"
      } else if (error.message.includes('Password should be')) {
        message = "Password must be at least 6 characters"
      } else if (error.message.includes('Failed to create profile')) {
        message = "Account created but profile creation failed. Please contact support."
        setIsSignUp(false)
      }
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  // switch between login / register
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp)
    setError(null)
    setSuccess(null)
    setName('')
    setEmail('')
    setPassword('')
    setBirthDate('')
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white dark:bg-[#24252a] rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {isSignUp ? 'Register' : 'Login'}
              </h2>

              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-400 rounded-lg">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <>

                    {/* name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your Name"
                      />
                    </div>
                    
                    {/* birth date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Birth Date
                      </label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
                
                {/* email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                {/* password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>

                {/* boutton*/}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1a1b1f] dark:bg-[#24252a] text-white py-3 rounded-lg font-semibold hover:bg-[#24252a] dark:hover:bg-[#2a2b30] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
                </button>
              </form>

              {/* switch mode */}
              <div className="mt-4 text-center">
                <button
                  onClick={toggleAuthMode}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <Suspense fallback={
          <div className="container mx-auto px-6">
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-[#24252a] rounded-xl p-8 shadow-lg">
                <div className="animate-pulse text-gray-400">Loading...</div>
              </div>
            </div>
          </div>
        }>
          <AuthForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}