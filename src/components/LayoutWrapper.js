'use client'

import { usePathname } from 'next/navigation'
import Navbar from './navbar'
import Footer from './footer'
import SupabaseAlert from './SupabaseAlert'

// if 3D scene : no navbar and footer
export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  const isScenePage = pathname?.includes('/scene')

  if (isScenePage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#1a1b1f] text-white">
      <SupabaseAlert />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

