"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-[#24252a]/95 backdrop-blur border-b border-gray-700">
                <nav className="container mx-auto flex items-center justify-between h-20 px-6">
                    {/* Logo*/}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                        src="/assets/logo2.png"
                        width={70}
                        height={70}
                        alt="Aurora Logo"
                        priority={true}
                        />
                    </Link>

                    {/* Login */}
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition">
                            Login
                        </button>
                        <button className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                            Register
                        </button>
                    </div>

                    {/* Bouton menu*/}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative w-8 h-6 flex flex-col justify-between items-center group focus:outline-none"
                        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    >
                        <span className={`block w-full h-0.5 bg-white group-hover:bg-gray-300 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                        <span className={`block w-full h-0.5 bg-white group-hover:bg-gray-300 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-full h-0.5 bg-white group-hover:bg-gray-300 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                    </button>
                </nav>
            </header>

            {/*Menu*/}

            <div
                className={`fixed inset-0 bg-[#1a1b1f] text-white flex flex-col items-center justify-center z-40 transition-all duration-300 ${
                isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}>

                {/* Links*/}
                <ul className="space-y-10 text-4xl font-light text-center tracking-wide">
                    <li>
                        <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-gray-400 transition">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/artists" onClick={() => setIsOpen(false)} className="hover:text-gray-400 transition">
                        Artists
                        </Link>
                    </li>
                    <li>
                        <Link href="/galleries" onClick={() => setIsOpen(false)} className="hover:text-gray-400 transition">
                        Galleries
                        </Link>
                    </li>
                    <li>
                        <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-gray-400 transition">
                        About
                        </Link>
                    </li>
                    <li>
                        <Link href="/contacts" onClick={() => setIsOpen(false)} className="hover:text-gray-400 transition">
                        Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
