export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-[#24252a]/95 backdrop-blur border-t border-gray-700 text-zinc-200">
      <div className="max-w-screen-xl mx-auto px-6 py-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center md:text-left">
          <span className="text-sm max-w-md md:max-w-lg whitespace-normal break-words">
            Project developed as part of the Web Technologies course at ECE Paris.
          </span>
          <span className="hidden md:inline text-gray-500">•</span>
          <div className="flex items-center gap-4">
            <a
              href="/"
              //https://github.com/Octaveeee/webtech-108
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-gray-600 px-3 py-1 text-xs font-medium text-gray-200/90 hover:text-white hover:border-gray-400 hover:bg-white/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/60"
              //className="text-gray-300 hover:text-white text-sm hover:underline underline-offset-4 transition"
            >GitHub</a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-gray-600 px-3 py-1 text-xs font-medium text-gray-200/90 hover:text-white hover:border-gray-400 hover:bg-white/5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/60"
              //className="text-gray-300 hover:text-white text-sm hover:underline underline-offset-4 transition"
            >LinkedIn</a>
          </div>
        </div>

        <div className="text-xs mt-2 opacity-90 text-center">
          © 2025 Webtech group-108 · All rights reserved
        </div>
      </div>
    </footer>
  );
}
