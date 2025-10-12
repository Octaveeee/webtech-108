export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo et description */}
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <span className="h-6 w-6 rounded bg-blue-600" aria-hidden="true" />
              <span className="text-lg font-semibold">Art Gallery</span>
            </div>
            
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © 2025 Art Gallery - Tous droits réservés
            </p>
          </div>
        </div>
      </footer>
    )
  }