
import {  Store } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

 
const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 text-xl font-extrabold  "
    >
      <Store className="h-10 w-10 " />
      <span className="hidden sm:inline-block">Stilo20</span>
    </Link>
  );
}

export default Logo;