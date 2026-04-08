// import React, { useState } from 'react';
// import { Menu, X, Play, MapPin, Clock, Users, Heart, ChevronDown } from 'lucide-react';

// function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showPrayerModal, setShowPrayerModal] = useState(false);

//   const navLinks = [
//     { name: 'Home', href: '#home' },
//     { name: 'About Pastor', href: '#pastor' },
//     { name: 'Ministries', href: '#ministries' },
//     { name: 'Sermons', href: '#sermons' },
//     { name: 'Events', href: '#events' },
//     { name: 'Live', href: '#live' },
//     { name: 'Give', href: '#give' },
//   ];

//   return (
//     <div className="min-h-screen bg-zinc-50 overflow-x-hidden">
//       {/* Navbar */}
//       <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-zinc-200">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">✝</div>
//             <div>
//               <h1 className="text-2xl font-bold heading-font text-primary">Grace Covenant</h1>
//               <p className="text-xs text-zinc-500 -mt-1">International Church</p>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8 text-sm font-medium">
//             {navLinks.map(link => (
//               <a key={link.name} href={link.href} className="hover:text-primary transition-colors">
//                 {link.name}
//               </a>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center gap-4">
//             <button 
//               onClick={() => setShowPrayerModal(true)}
//               className="px-6 py-3 bg-white border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all flex items-center gap-2"
//             >
//               <Heart className="w-5 h-5" /> Prayer Request
//             </button>
//             <a href="#give" className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-accent transition-all">
//               Give Online
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
//             {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden bg-white border-t py-6 px-6 flex flex-col gap-6 text-lg">
//             {navLinks.map(link => (
//               <a key={link.name} href={link.href} className="hover:text-primary" onClick={() => setIsMenuOpen(false)}>
//                 {link.name}
//               </a>
//             ))}
//             <div className="pt-4 border-t flex flex-col gap-4">
//               <button onClick={() => setShowPrayerModal(true)} className="w-full py-4 border-2 border-primary text-primary rounded-2xl font-semibold">
//                 Prayer Request
//               </button>
//               <a href="#give" className="w-full py-4 bg-primary text-white rounded-2xl text-center font-semibold">
//                 Give Online
//               </a>
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* HERO SECTION */}
//       <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')] bg-cover bg-center">
//           <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
//         </div>

//         <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
//           <div className="inline-block px-6 py-2 mt-10 bg-white/10 backdrop-blur-md rounded-full text-white text-sm mb-6 border border-white/30">
//             Welcome to Grace Covenant International
//           </div>
          
//           <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold heading-font text-white leading-tight mb-6">
//             Encountering <span className="text-accent">God's</span> Presence
//           </h1>
          
//           <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10">
//             A place where faith comes alive, lives are transformed, and God's love is experienced.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-5 justify-center">
//             <a href="#live" className="group px-10 py-5 bg-accent text-black font-semibold text-lg rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
//               <Play className="w-6 h-6 group-hover:scale-110 transition" /> Join Live Service
//             </a>
//             <a href="#pastor" className="px-10 py-5 border-2 border-white text-white font-semibold text-lg rounded-2xl hover:bg-white/10 transition-all">
//               Meet Our Pastor
//             </a>
//           </div>

//           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
//             <ChevronDown className="w-8 h-8 text-white" />
//           </div>
//         </div>
//       </section>

//       {/* ABOUT PASTOR */}
//       <section id="pastor" className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid md:grid-cols-2 gap-16 items-center">
//             <div>
//               <div className="inline-flex items-center gap-2 text-primary mb-4">
//                 <div className="w-3 h-px bg-primary"></div>
//                 OUR SHEPHERD
//               </div>
//               <h2 className="text-5xl md:text-6xl heading-font font-bold leading-tight mb-8">
//                 Pastor Dr. Michael Adebayo
//               </h2>
//               <p className="text-2xl text-zinc-600 mb-8">
//                 A man called by God with a burning passion to see souls saved and lives transformed through the power of the Holy Spirit.
//               </p>
//               <div className="space-y-6 text-lg text-zinc-700">
//                 <p>
//                   With over 25 years in ministry, Pastor Michael has planted churches across Nigeria and internationally. 
//                   His teachings are marked by deep revelation, practical wisdom, and undeniable signs and wonders.
//                 </p>
//                 <p>
//                   He is happily married to Pastor Mrs. Grace Adebayo and they are blessed with four children.
//                 </p>
//               </div>
//             </div>

//             <div className="relative">
//               <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070" 
//                   alt="Pastor Michael Adebayo"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-3xl shadow-xl max-w-xs">
//                 <p className="italic text-zinc-600">"The greatest calling is to lead people into an intimate relationship with Jesus Christ."</p>
//                 <p className="mt-4 font-semibold">— Pastor Michael Adebayo</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* MINISTRIES */}
//       <section id="ministries" className="py-24 bg-zinc-100">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl heading-font font-bold mb-4">Our Ministries</h2>
//             <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
//               Building strong disciples in every area of life
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { title: "Youth & Young Adults", icon: "🌱", desc: "Raising a generation on fire for God" },
//               { title: "Children Ministry", icon: "👶", desc: "Nurturing young hearts in God's Word" },
//               { title: "Men's Fellowship", icon: "🛡️", desc: "Raising godly men of impact" },
//               { title: "Women of Grace", icon: "🌸", desc: "Empowering women in faith & purpose" },
//               { title: "Music & Arts", icon: "🎵", desc: "Worship that ushers in God's presence" },
//               { title: "Outreach & Missions", icon: "🌍", desc: "Taking the Gospel to the nations" },
//             ].map((ministry, i) => (
//               <div key={i} className="bg-white p-10 rounded-3xl hover:shadow-2xl transition-all group">
//                 <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">{ministry.icon}</div>
//                 <h3 className="text-3xl font-semibold mb-4">{ministry.title}</h3>
//                 <p className="text-zinc-600">{ministry.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SERMONS */}
//       <section id="sermons" className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex justify-between items-end mb-12">
//             <div>
//               <h2 className="text-5xl heading-font font-bold">Latest Sermons</h2>
//               <p className="text-zinc-600 mt-3">Powerful messages that will transform your life</p>
//             </div>
//             <a href="#" className="text-primary font-semibold flex items-center gap-2 hover:underline">
//               View All Sermons →
//             </a>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[1,2,3].map((i) => (
//               <div key={i} className="group bg-white border border-zinc-200 rounded-3xl overflow-hidden hover:border-primary transition-all">
//                 <div className="aspect-video bg-zinc-200 relative">
//                   <img 
//                     src={`https://picsum.photos/id/${50+i}/600/340`} 
//                     alt="Sermon" 
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                     <Play className="w-16 h-16 text-white" />
//                   </div>
//                 </div>
//                 <div className="p-8">
//                   <div className="text-xs text-accent font-medium mb-2">SUNDAY SERVICE • APRIL 5, 2026</div>
//                   <h3 className="text-2xl font-semibold mb-3 leading-tight">Walking in the Supernatural Power of God</h3>
//                   <p className="text-sm text-zinc-500 line-clamp-2">Pastor Michael Adebayo teaches on how to activate the miraculous in your daily life through faith and obedience.</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* LIVE STREAM */}
//       <section id="live" className="py-24 bg-gradient-to-br from-primary to-blue-950 text-white">
//         <div className="max-w-6xl mx-auto px-6 text-center">
//           <div className="inline-flex items-center gap-3 bg-white/10 px-8 py-3 rounded-full mb-8">
//             <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
//             <span className="uppercase tracking-widest text-sm font-medium">LIVE EVERY SUNDAY 8:00 AM WAT</span>
//           </div>

//           <h2 className="text-6xl heading-font font-bold mb-6">Join Us Live</h2>
//           <p className="text-2xl max-w-2xl mx-auto mb-12">Experience powerful worship and life-changing teaching in real time</p>

//           <div className="bg-black/50 rounded-3xl overflow-hidden max-w-5xl mx-auto aspect-video flex items-center justify-center border border-white/20">
//             <div className="text-center">
//               <Play className="w-24 h-24 mx-auto mb-6 text-white/80" />
//               <p className="text-3xl font-medium">Sunday Service is Live</p>
//               <button className="mt-8 px-12 py-5 bg-white text-black rounded-2xl text-xl font-semibold hover:bg-accent transition">
//                 Watch Live Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* EVENTS */}
//       <section id="events" className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-5xl heading-font font-bold text-center mb-16">Upcoming Events</h2>

//           <div className="space-y-8">
//             {[
//               { title: "Holy Ghost Crusade 2026", date: "April 20 - 25", time: "6:00 PM Daily", location: "Church Auditorium" },
//               { title: "Marriage Enrichment Retreat", date: "May 8 - 9", time: "All Day", location: "Lagos Continental Hotel" },
//               { title: "Youth Fire Conference", date: "June 12", time: "9:00 AM", location: "Main Sanctuary" },
//             ].map((event, i) => (
//               <div key={i} className="border border-zinc-200 rounded-3xl p-10 flex flex-col md:flex-row gap-8 hover:border-accent transition-all group">
//                 <div className="md:w-48 flex-shrink-0">
//                   <div className="text-accent font-mono text-5xl font-bold">{event.date.split(' ')[0]}</div>
//                   <div className="text-sm uppercase tracking-widest text-zinc-500">{event.date.split(' - ')[1] || ''}</div>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-3xl font-semibold mb-4 group-hover:text-accent transition">{event.title}</h3>
//                   <div className="flex items-center gap-8 text-zinc-600">
//                     <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> {event.time}</div>
//                     <div className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {event.location}</div>
//                   </div>
//                 </div>
//                 <button className="mt-6 md:mt-0 px-10 py-4 border-2 border-primary rounded-2xl hover:bg-primary hover:text-white transition self-start">
//                   Register Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* PRAYER REQUEST MODAL */}
//       {showPrayerModal && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-6">
//           <div className="bg-white rounded-3xl max-w-lg w-full p-10">
//             <h3 className="text-3xl font-bold mb-8">Submit Prayer Request</h3>
            
//             <form className="space-y-6">
//               <div>
//                 <label className="block text-sm mb-2 font-medium">Your Name</label>
//                 <input type="text" className="w-full px-6 py-4 border rounded-2xl focus:outline-none focus:border-primary" placeholder="John Doe" />
//               </div>
//               <div>
//                 <label className="block text-sm mb-2 font-medium">Prayer Request</label>
//                 <textarea rows={6} className="w-full px-6 py-4 border rounded-3xl focus:outline-none focus:border-primary resize-none" placeholder="Please pray for my healing and breakthrough..."></textarea>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <button type="button" onClick={() => setShowPrayerModal(false)} className="py-5 border-2 border-zinc-300 rounded-2xl font-medium">Cancel</button>
//                 <button type="submit" className="py-5 bg-primary text-white rounded-2xl font-semibold">Submit Request</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* TESTIMONIES */}
//       <section className="py-24 bg-zinc-900 text-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-5xl heading-font font-bold text-center mb-16">Testimonies</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {["God healed my daughter from sickle cell after consistent prayers", "I got a miracle job after 3 years of unemployment", "My marriage was restored after attending the retreat"].map((testimony, i) => (
//               <div key={i} className="bg-zinc-800/50 p-10 rounded-3xl border border-white/10">
//                 <div className="text-6xl mb-6">“</div>
//                 <p className="text-xl leading-relaxed mb-8">{testimony}</p>
//                 <div className="text-accent">— Sister Aisha, Lagos</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* GIVING */}
//       <section id="give" className="py-24 bg-gradient-to-br from-amber-50 to-white">
//         <div className="max-w-4xl mx-auto px-6 text-center">
//           <h2 className="text-5xl heading-font font-bold mb-6">Support the Kingdom Work</h2>
//           <p className="text-2xl text-zinc-600 mb-12">Your generous giving helps us reach more souls and transform communities</p>

//           <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-auto">
//             <div className="text-6xl mb-8">🙏</div>
//             <h3 className="text-3xl font-semibold mb-8">Give Online Securely</h3>
            
//             <div className="grid grid-cols-3 gap-4 mb-8">
//               {[1000, 5000, 10000, 25000, 50000, 100000].map(amount => (
//                 <button key={amount} className="py-4 border border-zinc-300 rounded-2xl hover:border-primary hover:text-primary transition font-medium">
//                   ₦{amount.toLocaleString()}
//                 </button>
//               ))}
//             </div>

//             <button className="w-full py-6 bg-primary text-white rounded-2xl text-xl font-semibold hover:bg-accent transition">
//               Give Now with Paystack
//             </button>
//             <p className="text-xs text-zinc-500 mt-6">All donations are secure and tax-deductible where applicable</p>
//           </div>
//         </div>
//       </section>

//       {/* LOCATION & MAP */}
//       <section className="py-24 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid md:grid-cols-2 gap-16">
//             <div>
//               <h2 className="text-5xl heading-font font-bold mb-8">Visit Us</h2>
//               <div className="space-y-6 text-lg">
//                 <div className="flex items-start gap-4">
//                   <MapPin className="w-7 h-7 text-primary mt-1" />
//                   <div>
//                     <div className="font-semibold">Grace Covenant International Church</div>
//                     <div>12 Redemption Avenue, Ikeja, Lagos, Nigeria</div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-4">
//                   <Clock className="w-7 h-7 text-primary" />
//                   <div>Sunday Services: 8:00 AM & 10:30 AM</div>
//                 </div>
//               </div>
//             </div>

//             <div className="aspect-video bg-zinc-200 rounded-3xl overflow-hidden">
//               <iframe 
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d3.348!3d6.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2f!2sIkeja!5e0!3m2!1sen!2sng!4v123456789"
//                 width="100%" 
//                 height="100%" 
//                 style={{ border: 0 }} 
//                 allowFullScreen="" 
//                 loading="lazy"
//               ></iframe>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-zinc-950 text-white py-20">
//         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
//           <div>
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center text-3xl">✝</div>
//               <div className="text-2xl heading-font">Grace Covenant</div>
//             </div>
//             <p className="text-zinc-400">Raising a generation that knows God intimately and impacts the world powerfully.</p>
//           </div>

//           <div>
//             <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
//             <div className="space-y-3 text-zinc-400">
//               {navLinks.map(l => <a key={l.name} href={l.href} className="block hover:text-white">{l.name}</a>)}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-semibold text-lg mb-6">Connect With Us</h4>
//             <div className="flex gap-6 text-3xl">
//               <a href="#" className="hover:text-accent">📘</a>
//               <a href="#" className="hover:text-accent">📸</a>
//               <a href="#" className="hover:text-accent">▶️</a>
//               <a href="#" className="hover:text-accent">🐦</a>
//             </div>
//           </div>

//           <div>
//             <h4 className="font-semibold text-lg mb-6">Service Times</h4>
//             <div className="text-zinc-400 space-y-2">
//               <div>Sunday Worship - 8:00 AM &amp; 10:30 AM</div>
//               <div>Wednesday Bible Study - 6:30 PM</div>
//               <div>Friday Prayer Night - 7:00 PM</div>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-white/10 mt-20 pt-10 text-center text-sm text-zinc-500">
//           © 2026 Grace Covenant International Church • Lagos, Nigeria • All Rights Reserved
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { Menu, X, Play, MapPin, Clock, Heart, ChevronDown, ArrowRight } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPrayerModal, setShowPrayerModal] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Pastor', href: '#pastor' },
    { name: 'Ministries', href: '#ministries' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Events', href: '#events' },
    { name: 'Live', href: '#live' },
    { name: 'Give', href: '#give' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-2xl z-50 border-b border-purple-100 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#4C1D95] to-[#7C3AED] rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              ✝
            </div>
            <div>
              <h1 className="text-3xl font-bold heading-font tracking-tight text-[#4C1D95]">Grace Covenant</h1>
              <p className="text-xs -mt-1 text-[#7C3AED] font-medium tracking-widest">INTERNATIONAL CHURCH</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-9 text-base font-medium text-zinc-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#4C1D95] transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-[#F59E0B] to-[#FF6B6B] group-hover:w-full transition-all"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setShowPrayerModal(true)}
              className="px-7 py-3.5 border-2 border-[#4C1D95] text-[#4C1D95] font-semibold rounded-3xl hover:bg-[#4C1D95] hover:text-white transition-all flex items-center gap-2 hover:scale-105"
            >
              <Heart className="w-5 h-5" /> Prayer Request
            </button>
            <a
              href="#give"
              className="px-8 py-3.5 bg-gradient-to-r from-[#4C1D95] to-[#7C3AED] text-white font-semibold rounded-3xl shadow-lg hover:shadow-xl hover:from-[#F59E0B] hover:to-[#FF6B6B] transition-all flex items-center gap-2 hover:scale-105"
            >
              Give Now <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#4C1D95]">
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-8 px-6 text-lg font-medium space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block hover:text-[#4C1D95]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden hero-bg">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070')] bg-cover bg-center opacity-35"></div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-20 text-[9rem] text-white/10 animate-float">✝</div>
          <div className="absolute bottom-40 right-28 text-[8rem] text-white/10 animate-float" style={{ animationDelay: '2.5s' }}>✝</div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md px-8 py-3 rounded-full text-white text-sm mb-8 border border-white/30">
            🕊️ A Place of Power & Encounter
          </div>

          <h1 className="text-6xl md:text-7xl font-bold heading-font text-white leading-tight mb-8 tracking-tighter animate-glow">
            Where Heaven <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#FF6B6B]">Meets Earth</span>
          </h1>

          <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-12">
            Powerful worship • Life-changing teaching • Miracles, healing & breakthrough every week
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="#live"
              className="group px-12 py-6 bg-gradient-to-r from-[#F59E0B] to-[#FF6B6B] text-black font-semibold text-xl rounded-3xl flex items-center justify-center gap-4 hover:scale-110 transition-all shadow-xl"
            >
              <Play className="w-7 h-7 group-hover:scale-110 transition" fill="currentColor" />
              Join Live Service
            </a>
            <a
              href="#pastor"
              className="px-12 py-6 border-2 border-white text-white font-semibold text-xl rounded-3xl hover:bg-white hover:text-[#4C1D95] transition-all hover:scale-105"
            >
              Meet Pastor Michael
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-10 h-10 text-white/70" />
        </div>
      </section>

      {/* PASTOR SECTION */}
      <section id="pastor" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 text-[#F59E0B] font-medium">
                <div className="h-px w-12 bg-[#F59E0B]"></div>
                OUR SHEPHERD
              </div>
              <h2 className="text-5xl md:text-6xl heading-font font-bold leading-tight text-[#4C1D95]">
                Pastor Dr. Michael Adebayo
              </h2>
              <p className="text-2xl text-zinc-700">
                A vessel of fire called to ignite revival across nations.
              </p>
              <p className="text-lg text-zinc-600 leading-relaxed">
                With over 25 years in ministry, Pastor Michael preaches with apostolic authority, deep revelation, 
                and undeniable signs and wonders. He is married to Rev. Mrs. Grace Adebayo.
              </p>
            </div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-purple-100">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070"
                  alt="Pastor Michael Adebayo"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-8 -right-6 bg-white p-8 rounded-3xl shadow-xl max-w-sm">
                <p className="italic text-lg">"The Holy Spirit is not an option — He is our everything."</p>
                <p className="mt-6 font-semibold text-[#4C1D95]">— Pastor Dr. Michael Adebayo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MINISTRIES - Beautiful & Fully Visible */}
      {/* MINISTRIES - Beautiful & Fully Visible */}
      <section id="ministries" className="py-24 bg-gradient-to-br from-[#F3E8FF] via-white to-[#FEF3E8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl heading-font font-bold text-[#4C1D95] mb-4">
              Our Ministries
            </h2>
            <p className="text-xl text-zinc-700 max-w-2xl mx-auto">
              Raising disciples who carry God's fire in every area of life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Youth Fire", icon: "🔥", desc: "Igniting young hearts with passion for Jesus", color: "from-orange-500 to-red-600" },
              { title: "Children of Promise", icon: "🌈", desc: "Building strong biblical foundations in kids", color: "from-pink-500 to-purple-600" },
              { title: "Men of Valor", icon: "🛡️", desc: "Raising courageous kingdom men", color: "from-blue-600 to-indigo-700" },
              { title: "Women of Grace", icon: "🌺", desc: "Empowering women in faith and purpose", color: "from-rose-500 to-pink-600" },
              { title: "Worship & Arts", icon: "🎵", desc: "Creating atmospheres for God's presence", color: "from-amber-500 to-yellow-600" },
              { title: "Global Missions", icon: "🌍", desc: "Taking the Gospel to the nations", color: "from-emerald-500 to-teal-600" },
            ].map((ministry, i) => (
              <div
                key={i}
                className="card-hover bg-white p-10 rounded-3xl border border-transparent group shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div 
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${ministry.color} 
                    flex items-center justify-center text-5xl mb-8 transition-all 
                    group-hover:scale-110 group-hover:rotate-6 shadow-md`}
                >
                  {ministry.icon}
                </div>
                <h3 className="text-3xl font-semibold mb-4 text-[#4C1D95]">
                  {ministry.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  {ministry.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

  
      <section id="sermons" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl heading-font font-bold text-[#4C1D95]">Latest Sermons</h2>
            <p className="text-xl text-zinc-600 mt-3">Powerful messages that transform lives</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-hover bg-white border border-zinc-100 rounded-3xl overflow-hidden group">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={`https://picsum.photos/id/${70 + i}/800/450`}
                    alt="Sermon"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 flex items-center justify-center">
                    <Play className="w-14 h-14 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-[#F59E0B] text-sm font-medium mb-3">SUNDAY SERVICE • APRIL 2026</div>
                  <h3 className="text-2xl font-semibold leading-tight mb-3">Walking in the Supernatural Power of God</h3>
                  <p className="text-zinc-600 line-clamp-3">Pastor Michael teaches how to activate the miraculous through faith and obedience.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE STREAM */}
      <section id="live" className="py-24 bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-black text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur px-10 py-4 rounded-full mb-10">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            <span className="uppercase tracking-widest font-semibold">LIVE EVERY SUNDAY 8:00 AM WAT</span>
          </div>

          <h2 className="text-5xl md:text-6xl heading-font font-bold mb-6">Join Us Live</h2>
          <p className="text-2xl text-white/80 max-w-2xl mx-auto mb-12">Experience powerful worship and anointed teaching in real time</p>

          <div className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-3xl aspect-video max-w-5xl mx-auto flex items-center justify-center">
            <div className="text-center">
              <Play className="w-20 h-20 mx-auto mb-8 text-white" fill="currentColor" />
              <p className="text-3xl font-medium">Sunday Service is LIVE</p>
              <button className="mt-10 px-14 py-6 bg-gradient-to-r from-[#F59E0B] to-[#FF6B6B] text-black font-semibold text-xl rounded-3xl hover:scale-110 transition-all shadow-xl">
                Watch Live Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl heading-font font-bold text-center text-[#4C1D95] mb-16">Upcoming Events</h2>

          <div className="space-y-8">
            {[
              { title: "Holy Ghost Crusade 2026", date: "April 20 - 25", time: "6:00 PM Daily", location: "Main Auditorium" },
              { title: "Marriage Enrichment Retreat", date: "May 8 - 9", time: "All Day", location: "Lagos Continental Hotel" },
              { title: "Youth Fire Conference", date: "June 12", time: "9:00 AM", location: "Grace Covenant Sanctuary" },
            ].map((event, i) => (
              <div key={i} className="card-hover border border-zinc-100 rounded-3xl p-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-52 flex-shrink-0">
                  <div className="text-5xl font-bold text-[#F59E0B]">{event.date.split(" ")[0]}</div>
                  <div className="text-zinc-500">{event.date.split(" - ")[1]}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-semibold mb-3">{event.title}</h3>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-zinc-600">
                    <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> {event.time}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {event.location}</div>
                  </div>
                </div>
                <button className="px-10 py-4 border-2 border-[#4C1D95] rounded-3xl font-medium hover:bg-[#4C1D95] hover:text-white transition-all">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRAYER MODAL */}
      {showPrayerModal && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl max-w-lg w-full p-12 relative">
            <button
              onClick={() => setShowPrayerModal(false)}
              className="absolute top-8 right-8 text-4xl text-zinc-400 hover:text-black"
            >
              ×
            </button>
            <div className="text-center mb-10">
              <div className="text-7xl mb-6">🙏</div>
              <h3 className="text-4xl heading-font font-bold text-[#4C1D95]">Prayer Request</h3>
              <p className="text-zinc-600 mt-2">We are standing with you in faith</p>
            </div>
            <form className="space-y-6">
              <input type="text" placeholder="Your Full Name" className="w-full px-7 py-5 border border-zinc-200 rounded-3xl focus:border-[#4C1D95] text-base" />
              <textarea rows={6} placeholder="Write your prayer request..." className="w-full px-7 py-5 border border-zinc-200 rounded-3xl focus:border-[#4C1D95] text-base resize-none"></textarea>
              <button type="submit" className="w-full py-6 bg-gradient-to-r from-[#4C1D95] to-[#7C3AED] text-white font-semibold text-lg rounded-3xl hover:brightness-110 transition">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TESTIMONIES */}
      <section className="py-24 bg-gradient-to-br from-[#4C1D95] to-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl heading-font font-bold text-center mb-16">Testimonies of God's Goodness</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "My daughter was healed of sickle cell after prayers during the crusade. Glory to God!",
              "I received a miracle job after 3 years of unemployment following one service.",
              "Our marriage was restored completely after attending the Marriage Retreat.",
            ].map((testimony, i) => (
              <div key={i} className="bg-white/10 backdrop-blur border border-white/20 p-10 rounded-3xl">
                <div className="text-6xl mb-8">“</div>
                <p className="text-lg leading-relaxed mb-8">{testimony}</p>
                <div className="text-[#F59E0B] font-medium">— Testifier, Lagos</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIVING */}
      <section id="give" className="py-24 bg-gradient-to-br from-[#FEF3E8] to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl heading-font font-bold text-[#4C1D95] mb-6">Support the Kingdom Work</h2>
          <p className="text-xl text-zinc-700 mb-12">Your generous giving helps us reach more souls for Christ</p>

          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="text-7xl mb-8">🙏</div>
            <h3 className="text-4xl font-semibold mb-10">Give Online Securely</h3>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[5000, 10000, 25000, 50000, 100000, 200000].map((amt) => (
                <button
                  key={amt}
                  className="py-5 border-2 border-zinc-200 hover:border-[#F59E0B] hover:text-[#F59E0B] rounded-3xl font-medium transition"
                >
                  ₦{amt.toLocaleString()}
                </button>
              ))}
            </div>

            <button className="w-full py-7 bg-gradient-to-r from-[#4C1D95] to-[#7C3AED] text-white font-semibold text-xl rounded-3xl hover:scale-105 transition-all">
              Give Now with Paystack
            </button>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl heading-font font-bold text-[#4C1D95] mb-10">Visit Us</h2>
              <div className="space-y-8 text-lg">
                <div className="flex gap-5">
                  <MapPin className="w-7 h-7 text-[#F59E0B] mt-1 flex-shrink-0" />
                  <div>12 Redemption Avenue, Ikeja, Lagos, Nigeria</div>
                </div>
                <div className="flex gap-5">
                  <Clock className="w-7 h-7 text-[#F59E0B] mt-1 flex-shrink-0" />
                  <div>
                    Sunday Services: 8:00 AM &amp; 10:30 AM<br />
                    Wednesday Bible Study: 6:30 PM<br />
                    Friday Prayer Night: 7:00 PM
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-purple-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d3.348!3d6.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2f!2sIkeja!5e0!3m2!1sen!2sng!4v123456789"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-black to-[#4C1D95] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white text-[#4C1D95] rounded-2xl flex items-center justify-center text-4xl">✝</div>
              <div className="text-3xl heading-font">Grace Covenant</div>
            </div>
            <p className="text-zinc-400">Raising a generation that knows God intimately and impacts the world.</p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-[#F59E0B]">Quick Links</h4>
            <div className="space-y-3 text-zinc-400">
              {navLinks.map((l) => (
                <a key={l.name} href={l.href} className="block hover:text-white transition-colors">
                  {l.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-[#F59E0B]">Connect</h4>
            <div className="flex gap-8 text-4xl">
              <a href="#" className="hover:text-[#F59E0B]">📘</a>
              <a href="#" className="hover:text-[#F59E0B]">📸</a>
              <a href="#" className="hover:text-[#F59E0B]">▶️</a>
              <a href="#" className="hover:text-[#F59E0B]">🐦</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6 text-[#F59E0B]">Service Times</h4>
            <div className="text-zinc-400 space-y-2">
              <div>Sunday Worship — 8:00 AM &amp; 10:30 AM</div>
              <div>Wednesday Bible Study — 6:30 PM</div>
              <div>Friday Prayer Night — 7:00 PM</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-16 pt-10 text-center text-sm text-zinc-500">
          © 2026 Grace Covenant International Church • Lagos, Nigeria
        </div>
      </footer>
    </div>
  );
}

export default App;