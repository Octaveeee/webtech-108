export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-[#24252a]/95 backdrop-blur border-t border-gray-700 text-zinc-200">
      <div className="max-w-screen-xl mx-auto px-6 py-4">
        {/* info */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center md:text-left">
          <span className="text-sm max-w-md md:max-w-lg whitespace-normal break-words">
            Project developed as part of the Web Technologies course at ECE Paris.
          </span>
        </div>
        <div className="text-xs mt-2 opacity-90 text-center">
          © 2025 Webtech group-108 · All rights reserved
        </div>
      </div>
    </footer>
  );
}
