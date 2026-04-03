'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/auth/me').then(res => res.json()).then(data => setUser(data.user));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="logo flex items-center gap-2">
          <img src="https://i.ibb.co.com/bjcsBPvg/Logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl text-purple-700">NetExpressJob</span>
        </div>
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <div className={`${menuOpen ? 'block' : 'hidden'} md:flex md:items-center gap-6 absolute md:static top-16 left-0 w-full bg-white md:bg-transparent p-4 md:p-0 shadow md:shadow-none`}>
          <nav className="flex flex-col md:flex-row gap-4">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <Link href="/#services" className="hover:text-purple-600">Courses</Link>
            <Link href="/#faq" className="hover:text-purple-600">FAQ</Link>
            <Link href="/#contact" className="hover:text-purple-600">Contact</Link>
          </nav>
          <div className="flex gap-3 mt-3 md:mt-0">
            {user ? (
              <>
                <span className="text-gray-700">Hi, {user.name}</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" className="bg-purple-600 text-white px-4 py-1 rounded">Login</Link>
                <Link href="/register" className="border border-purple-600 text-purple-600 px-4 py-1 rounded">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
