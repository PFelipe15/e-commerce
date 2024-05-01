
import {  Store } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from '../../app/assets/412762104_700966975471907_1046785583651790907_n.jpg'
 
const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 text-xl font-extrabold  "
    >

      <Image
      src={logo}
      width={50}
      height={50}
      className='rounded-md'
      />
       <span className="hidden sm:inline-block">Stilo20</span>
    </Link>
  );
}

export default Logo;