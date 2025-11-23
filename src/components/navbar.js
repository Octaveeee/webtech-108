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
    const [showProfile, setShowProfile] = useState(false);
    const [editingName, setEditingName] = useState(false);
    const [newName, setNewName] = useState('');
    const [updatingName, setUpdatingName] = useState(false);
    const [nameError, setNameError] = useState(null);
    
    useEffect(() => {
        // check user login
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            
            if (user) {
                const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
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

    const canEditName = () => {
        if (!profile?.updated_at) return true;
        const lastUpdate = new Date(profile.updated_at);
        const now = new Date();
        const daysDiff = (now - lastUpdate) / (1000 * 60 * 60 * 24);
        return daysDiff >= 5;
    };

    const handleStartEditName = () => {
        if (!canEditName()) return;
        setNewName(profile.name);
        setEditingName(true);
        setNameError(null);
    };

    const handleCancelEditName = () => {
        setEditingName(false);
        setNewName('');
        setNameError(null);
    };

    const handleUpdateName = async () => {
        if (!newName.trim() || newName.trim() === profile.name) {
            setEditingName(false);
            return;
        }

        if (!canEditName()) {
            setNameError('You can only change your name once every 5 days');
            return;
        }

        setUpdatingName(true);
        setNameError(null);

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    name: newName.trim(),
                    updated_at: new Date().toISOString()
                })
                .eq('user_id', user.id);

            if (error) throw error;

            const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
            setProfile(data);
            setEditingName(false);
            setNewName('');
        } catch (err) {
            setNameError(err.message);
        } finally {
            setUpdatingName(false);
        }
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
                        {loading ? (<div className="text-gray-400">Loading...</div>) : user && profile ? (

                            <div className="flex items-center gap-5">
                                <button 
                                    onClick={async () => {
                                        const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
                                        setProfile(data);
                                        setEditingName(false);
                                        setNewName('');
                                        setNameError(null);
                                        setShowProfile(true);
                                    }} 
                                    className="px-4 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                                >
                                    {profile.name}
                                </button>
                                <button onClick={handleLogout} className="px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-lg transition flex items-center gap-2">
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
            <div className={`fixed inset-0 bg-[#1a1b1f] text-white flex flex-col items-center justify-center z-40 transition-all duration-300 ${
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
                        <Link href="/contacts" onClick={() => setIsOpen(false)} className="hover:text-gray-400 transition">
                        Contact
                        </Link>
                    </li>
                </ul>
            </div>

            {showProfile && profile && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => {
                    setShowProfile(false);
                    setEditingName(false);
                    setNewName('');
                    setNameError(null);
                }}>
                    <div className="bg-[#24252a] rounded-lg p-6 max-w-md w-full mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-white">Profile</h2>
                            <button onClick={() => setShowProfile(false)} className="text-gray-400 hover:text-white text-2xl">
                                x
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm text-gray-400">Name</p>
                                    {!editingName && canEditName() && (
                                        <button
                                            onClick={handleStartEditName}
                                            className="text-sm text-blue-400 hover:text-blue-300 transition"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </div>
                                {editingName ? (
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            disabled={updatingName}
                                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                                            autoFocus
                                        />
                                        {nameError && (
                                            <p className="text-sm text-red-400">{nameError}</p>
                                        )}
                                        {!canEditName() && (
                                            <p className="text-sm text-orange-400">
                                                You can only change your name once every 5 days
                                            </p>
                                        )}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleUpdateName}
                                                disabled={updatingName || !newName.trim()}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {updatingName ? 'Saving...' : 'Save'}
                                            </button>
                                            <button
                                                onClick={handleCancelEditName}
                                                disabled={updatingName}
                                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition text-sm disabled:opacity-50"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-white text-lg">{profile.name}</p>
                                        {!canEditName() && profile.updated_at && (() => {
                                            const lastUpdate = new Date(profile.updated_at);
                                            const now = new Date();
                                            const daysDiff = (now - lastUpdate) / (1000 * 60 * 60 * 24);
                                            const daysRemaining = Math.ceil(5 - daysDiff);
                                            return (
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Name can be changed again in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}
                                                </p>
                                            );
                                        })()}
                                    </>
                                )}
                            </div>
                            {profile.birth_date && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Birth Date</p>
                                    <p className="text-white text-lg">
                                        {new Date(profile.birth_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}
                            {user?.email && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Email</p>
                                    <p className="text-white text-lg">{user.email}</p>
                                </div>
                            )}
                            {profile.created_at && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Member since</p>
                                    <p className="text-white text-lg">
                                        {new Date(profile.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long'
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
