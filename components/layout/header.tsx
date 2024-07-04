'use client'
import React from 'react';
import Logo from './logo';
import CartButton from './cart-button';
import UserNav from './user-nav';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Map, PhoneCall, Truck, HelpCircle, Tag, Package, Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className={`sticky top-0 z-10 shadow bg-white text-primary`}>
      <div className="container mx-auto p-4 md:p-8 flex items-center justify-between flex-col md:flex-row gap-4">
        <Logo />
        <div className="flex items-center justify-center space-x-2 md:space-x-4">
          <CartButton />
          <nav className='flex gap-2 md:gap-4 items-center'>
            <Link href={"#Localization"}>
              <Button className="w-full lg:w-auto">
                <span className="hidden sm:inline">Nossas Lojas</span>
                <span className="sm:hidden"><Map /></span>
              </Button>
            </Link>
            <Link href={"#Contact"}>
              <Button className="bg-green-500 w-full lg:w-auto">
                <span className="hidden sm:inline">Fale conosco</span>
                <span className="sm:hidden"><PhoneCall /></span>
              </Button>
            </Link>
            
            <Link href={"/#Promotions"}>
              <Button className="bg-red-500 w-full lg:w-auto">
                <span className="hidden sm:inline">Promoções</span>
                <span className="sm:hidden"><Tag /></span>
              </Button>
            </Link>
            
          </nav>
          <UserNav />
        </div>
      </div>
      <div className="bg-primary hidden  text-white py-2 md:flex justify-center items-center space-x-4">
        <div className="flex items-center">
          <Truck className="mr-1" />
          <span> Fazemos entrega</span>
        </div>
        <div className="flex items-center">
          <Clock className="mr-1" />
          <span> Horário: 9h - 18h</span>
        </div>
        <div className="flex items-center">
          <HelpCircle className="mr-1" />
          <span> Atendimento ao Cliente 24/7</span>
        </div>
        <div className="flex items-center">
          <Package className="mr-1" />
          <span> Envio Grátis em Pedidos Acima de R$100</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
