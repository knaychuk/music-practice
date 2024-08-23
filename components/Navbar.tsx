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
  ];

  return (
    <div>
      {navItems.map(item => (
        <Link key={item.path} href={item.path} className={`text-black ${pathname === item.path ? 'text-red-500' : 'text-black'}`}>
          {item.name}
        </Link>
      ))}
    </div>
  )
}
export default Navbar