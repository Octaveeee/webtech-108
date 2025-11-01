'use client'


export default function HelpPanel() {
  
    return (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 transition-all duration-300">
        <div className="bg-[#1a1b1f]/95 backdrop-blur border-l border-gray-700 shadow-lg">   
            <div className="w-64 p-4 text-white">
              <h3 className="text-lg font-semibold mb-3 text-gray-200">Controls</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">Z</kbd>
                  <span className="text-gray-300">Move forward</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">S</kbd>
                  <span className="text-gray-300">Move backward</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">Q</kbd>
                  <span className="text-gray-300">Move left</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">D</kbd>
                  <span className="text-gray-300">Move right</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-gray-800 rounded text-xs font-mono">Space</kbd>
                  <span className="text-gray-300">Jump</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-gray-400 text-xs">Mouse</span>
                  <span className="text-gray-300">Look around</span>
                </div>
              </div>
            </div>
        </div>
      </div>
    )
}



