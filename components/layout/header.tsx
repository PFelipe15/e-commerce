'use client'
import React, { useEffect, useState } from 'react';
import Logo from './logo';
import CartButton from './cart-button';
import UserNav from './user-nav';
import { Button } from '../ui/button';
import Link from 'next/link';
  
 

const Header: React.FC = () => {
  return (
    <header className={`sticky top-0 z-10 shadow bg-white text-primary`}>
      <div className="container mx-auto p-8 flex items-center justify-between">
        <Logo />
        <div className="flex items-center justify-center space-x-4">
          <CartButton />
          <nav>
            <Link href={"#Localization"}>
              <Button>Nossas Lojas</Button>
            </Link>
          </nav>
          <UserNav />
        </div>
      </div>
    </header>
  );
}

export default Header;