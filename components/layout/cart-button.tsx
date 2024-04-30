'use client'
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useShoppingCart } from 'use-shopping-cart';

const CartButton = () => {
  const { cartCount, formattedTotalPrice} = useShoppingCart();
  return (
    <Link href={"/cart"} className="flex items-center justify-center gap-2  ">
      <ShoppingCart className="w-6 h-6 font-extrabold" />({formattedTotalPrice})
      ({cartCount})
    </Link>
  );
};

export default CartButton;