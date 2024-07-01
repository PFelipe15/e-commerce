

'use client';
 import { useCartStore } from '@/store';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CheckoutButton from './CheckoutButton';
import Checkout from './Checkout';
import OrderCompleted from '././OrderCompleted';
import { formatPrice } from './../../lib/formatPrice';
 import {  CircleMinus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import Link from 'next/link';


export default function CartDrawer() {
  const useStore = useCartStore();

  const totalPriceAll = useStore.cart.reduce((acc, item) => {
    return acc + Number(item.price!) * item.quantity!;
  }, 0);

  return (
    <section className="flex flex-col items-center justify-between gap-4 p-6 bg-gray-100 h-screen">

<div className = "flex flex-col ">

      <h1 className="text-2xl font-bold p-2 text-primary rounded-md">
        Carrinho de Compras 🛒
      </h1>
        <Button
        variant= 'link'
          onClick={() => useStore.toggleCart()}
          className='font-bold text-sm  '
        >
          Voltar para loja
        </Button>
</div>
        <div className='border-t border-gray-400 my-4'></div>

        {useStore.onCheckout === 'cart' && (
          <>
          <div className='w-full max-w-lg overflow-y-auto flex-grow' >

            {useStore.cart.map((item) => (
            <Card
              key={item.id}
              className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-4"
            >
              <CardHeader className="bg-primary p-4">
                <CardTitle className="text-base font-bold text-white">
                  {item.name} ({item.quantity})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 flex items-center">
                <Image
                  src={item.image || ""}
                  width={75}
                  height={75}
                  alt={item.name}
                  className="object-cover rounded-md"
                />
                <div className="flex  items-center justify-between gap-2 flex-grow ml-4">
                  <p className="text-lg font-semibold">
                    Preço: {formatPrice(Number(item.price))}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => {
                        useStore.removeProduct(item)
                      }}
                    >
                      <CircleMinus size={20} />
                    </Button>
                    <Link
                      href={`/products/${item.id}`}
                      className="text-white p-2 rounded-md bg-primary hover:text-black"
                    >
 
                      Detalhes
                      
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
          </>
        )}

        {useStore.cart.length > 0 && useStore.onCheckout === 'cart' && (
          <CheckoutButton totalPrice={totalPriceAll} />
        )}

        {useStore.onCheckout === 'checkout' && <Checkout />}
        {useStore.onCheckout === 'success' && <OrderCompleted />}
      
    </section>
  );
}