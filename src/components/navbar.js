"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { CiLogout, CiLogin } from "react-icons/ci";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // check user login
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            
            if (user) {
                const { data } = await supabase.from('profiles').select('name').eq('user_id', user.id).single();
                setProfile(data);
            } 
            setLoading(false);
        }

        getUser();


    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    };


    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-[#24252a]/95 backdrop-blur border-b border-gray-700">
                <nav className="container mx-auto grid grid-cols-3 items-center h-20 px-6">
                    {/* Logo*/}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                        src="/assets/logo2.png"
                        width={70}
                        height={70}
                        alt="Aurora Logo"
                        />
                    </Link>

                    {/* Bouton menu*/}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="relative w-8 h-6 flex flex-col justify-between items-center group focus:outline-none"
                        >
                            <span className={`block w-full h-0.5 bg-white group-hover:bg-gray-300 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                            <span className={`block w-full h-0.5 bg-white group-hover:bg-gray-300 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block w-full h-0.5 bg-white group-hover:bg-gray-300 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                        </button>
                    </div>

                    {/* Login */}
                    <div className="flex items-center justify-end gap-3">
                        {loading ? (
                            <div className="text-gray-400">Loading...</div>
                        ) : user && profile ? (
                            <div className="flex items-center gap-3">
                                <span className="text-gray-300">{profile.name}</span>
                                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition flex items-center gap-2"
                                >
                                    <CiLogout size={24} />
                                    Logout
                                </button>
                            </div>
                        ) : (
<>
                                <Link href="/auth?mode=login" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition flex items-center gap-2">
                                    <CiLogin size={24} />
                                    Login
                                </Link>
                                <Link href="/auth?mode=register" className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                                    Register
                                </Link>
                            </>

                        )}
                        
                    </div>
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
