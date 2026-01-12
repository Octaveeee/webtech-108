'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function SupabaseAlert() {
  const [isConnected, setIsConnected] = useState(true)
  const [isChecking, setIsChecking] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.from('artists').select('id').limit(1)
        
        if (error) {
          setIsConnected(false)
        } else {
          setIsConnected(true)
        }
      } catch (err) {
        setIsConnected(false)
      } finally {
        setIsChecking(false)
      }
    }

    checkConnection()
  }, [])

  if (isChecking || isConnected || isDismissed) {
    return null
  }

  return (
    <div className="fixed top-20 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm font-medium">
            ⚠️ The Supabase database is no longer connected. Some features may not work properly.
          </p>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="ml-4 flex-shrink-0 text-white hover:text-gray-200 transition-colors"
          aria-label="Close alert"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}
