'use client';
import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function HomePage() {
  const [modal, setModal] = useState<{ open: boolean; title: string; desc: string }>({ open: false, title: '', desc: '' });
  const courses = [
    { id:1, img:'https://i.postimg.cc/3J2vsXnD/course1.jpg', title:'Quran education', desc:'Quran education is the guiding light...' },
    { id:2, img:'https://i.postimg.cc/6p0G39sW/course2.jpg', title:'Cyber Security', desc:'Cybersecurity protects computers...' },
    // add all 8 courses
  ];
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4">
        <section className="hero py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">WELCOME TO NETEXPRESSJOB</h1>
          <div className="video-container my-6">
            <iframe width="100%" height="420" src="https://www.youtube.com/embed/tt2mvij4uak?autoplay=1&mute=1&loop=1&playlist=tt2mvij4uak" allow="autoplay; encrypted-media" className="rounded-xl"></iframe>
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto">It is a Bangladeshi trusted online platform...</p>
          <div className="btns flex gap-4 justify-center mt-6">
            <Link href="/login" className="bg-purple-600 text-white px-6 py-2 rounded-full">Login</Link>
            <Link href="/register" className="bg-gray-200 px-6 py-2 rounded-full">Sign Up</Link>
          </div>
        </section>
        <section className="services py-12">
          <h2 className="text-2xl font-bold text-center mb-8">OUR SERVICES</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center"><b>10+</b> Courses</div>
            <div className="bg-white p-6 rounded-xl shadow text-center">Expert Trainer</div>
            <div className="bg-white p-6 rounded-xl shadow text-center">Lifetime Access</div>
          </div>
        </section>
        <section className="popular-courses py-12">
          <h2 className="text-2xl font-bold text-center mb-8">Popular Courses</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {courses.map(c => (
              <div key={c.id} className="bg-white rounded-xl shadow cursor-pointer" onClick={() => setModal({ open: true, title: c.title, desc: c.desc })}>
                <img src={c.img} className="w-full h-40 object-cover rounded-t-xl" />
                <div className="p-4"><h3 className="font-bold">{c.title}</h3></div>
              </div>
            ))}
          </div>
        </section>
        <section className="impact grid md:grid-cols-3 gap-6 py-12 text-center">
          <div className="bg-purple-100 p-4 rounded-xl">Total Withdrawals: $3,184,681</div>
          <div className="bg-purple-100 p-4 rounded-xl">Active Students: 7,886</div>
          <div className="bg-purple-100 p-4 rounded-xl">Monthly Withdrawals: $6,370</div>
        </section>
        <section id="faq" className="faq py-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">FAQ</h2>
          <details><summary className="cursor-pointer">What is NetExpressJob?</summary><p>It's a learning and earning platform...</p></details>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setModal({ open: false, title: '', desc: '' })}>
          <div className="bg-white rounded-xl max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold">{modal.title}</h3>
            <p>{modal.desc}</p>
            <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded" onClick={() => setModal({ open: false, title: '', desc: '' })}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
