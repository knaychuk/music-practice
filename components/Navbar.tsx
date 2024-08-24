'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Practice', path: '/practice' },
    { name: 'Sheet Music', path: '/sheet-music' },
    { name: 'Tuner', path: '/tuner' },
    { name: 'Metronome', path: '/metronome' },
    { name: 'Record', path: '/record' },
  ];

  return (
    // <div className="text-xl text-white flex justify-between bg-primary px-4 py-4 m-6 rounded-lg shadow-lg shadow-gray-300">
    //   <a href="/home">
    //     MP
    //   </a>
    //   <div className="flex h-full items-stretch">
    //   {navItems.map(item => (
    //     <Link key={item.path} href={item.path} className={`mx-3 px-4 py-2 rounded-lg ${pathname === item.path ? 'text-red-500 bg-white h-full' : ''}`}>
    //       {item.name}
    //     </Link>
    //   ))} 
    //   </div>
    //   <div>Profile</div>
    // </div>
    <div className="text-xl text-white flex justify-between bg-primary px-4 m-6 rounded-lg shadow-lg shadow-gray-300 h-16">
  <a href="/home" className="flex items-center">
    MP
  </a>
  <div className="flex h-full items-center">
    {navItems.map(item => (
      <Link
        key={item.path}
        href={item.path}
        className={`flex items-center justify-center px-4 h-full ${pathname === item.path ? 'text-red-500 bg-white font-bold' : ''}`}
      >
        {item.name}
      </Link>
    ))}
  </div>
  <div className="flex items-center">
    Profile
  </div>
</div>

  )
}
export default Navbar