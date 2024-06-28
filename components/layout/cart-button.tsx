'use client'
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { useShoppingCart } from 'use-shopping-cart';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import CartDisplay from './cartDisplay';
import { useCartStore } from '@/store';
import { formatPrice } from '@/lib/formatPrice';
const CartButton = () => {
  const [isClient, setIsClient] = useState(false)
  const { cartCount, formattedTotalPrice, shouldDisplayCart, handleCartClick  } = useShoppingCart();
 
  const useStore = useCartStore()

  useEffect(() => {
    setIsClient(true)
  }, [])
  

  const totalPriceAll = useStore.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);

  return (
    <Sheet  open={useStore.isOpen}  >
      <SheetTrigger  className="flex items-center justify-center gap-2" onClick={()=>{
useStore.toggleCart()
      }}>
        <ShoppingCart className=" md:w-6 md:h-6 md:font-extrabold " />(
        {isClient ?  formatPrice(totalPriceAll) : "..."})
        <div className="bg-primary rounded-full text-white p-1 text-sm font-normal">
          ({isClient ? useStore.cart?.length : "..."})
        </div>
      </SheetTrigger>
      <SheetContent    >
        <CartDisplay />
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;