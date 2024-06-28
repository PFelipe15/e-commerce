'use client'

import {CartProvider} from 'use-shopping-cart'

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
interface appCartProviderProps{
    children: React.ReactNode
}

export default function AppCartProvider({children}:appCartProviderProps){
  return (
    <CartProvider
      shouldPersist
      cartMode="checkout-session"
      stripe={stripeKey}
      currency="BRL"
      
    >
      {children}
    </CartProvider>
  );
}
