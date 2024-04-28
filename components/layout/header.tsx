import React from 'react';
import CartButton from './Cart-button';
import Logo from './Logo';
import UserNav from './User-nav';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Logo />
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-white hover:text-gray-200 transition duration-300">
              Home
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition duration-300">
              Shop
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition duration-300">
              About
            </a>
            <a href="#" className="text-white hover:text-gray-200 transition duration-300">
              Contact
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <CartButton />
          <UserNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
