
import {  Store } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

 
const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2 text-xl font-extrabold text-primary"
    >
      <Store className="h-10 w-10 text-primary" />
      <span className="hidden sm:inline-block">Stilo20</span>
    </Link>
  );
}

export default Logo;