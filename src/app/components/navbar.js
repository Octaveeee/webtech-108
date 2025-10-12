import Link from 'next/link'

export default function Navbar() {
  return (

    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <nav className="container flex h-14 items-center gap-8">
            <Link href="/" className="flex items-center gap-2 ml-3">
                <span className="h-6 w-6 rounded bg-blue-600" aria-hidden="true" />
                <span className="text-lg font-semibold text-gray-900">Mini games</span>
            </Link>
          
            <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                    Home
                </Link>
                <Link href="/components/about" className="text-gray-700 hover:text-blue-600">
                    About
                </Link>
                <Link href="/components/contacts" className="text-gray-700 hover:text-blue-600">
                    Contacts
                </Link>
            </div>
        </nav>
    </header>
  );
}
