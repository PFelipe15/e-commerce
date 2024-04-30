'use client'
import React, { useState } from 'react';
 import { useShoppingCart } from "use-shopping-cart";
 import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { Loader, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {   useToast } from '@/components/ui/use-toast';

 const Cart: React.FC = () => {
 const [isCheckingOut, setIsCheckingOut] = useState<Boolean>(false)
 const { toast } = useToast()

 const {cartCount, cartDetails, redirectToCheckout, clearCart , removeItem} = useShoppingCart()

async function checkout() {
 setIsCheckingOut(true);

 const response = await fetch("/api/checkout", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(cartDetails),
 });

 const {id} = await response.json()
 const result = await redirectToCheckout(id);
 setIsCheckingOut(false)
}
return (
  <section className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-100">
    {cartDetails &&
      Object.keys(cartDetails).map((key) => (
        <Card
          key={cartDetails[key].id}
          className="w-full max-w-2xl bg-white rounded-lg shadow-md overflow-hidden"
        >
          <CardHeader className="bg-primary p-4">
            <CardTitle className="text-lg font-bold text-white">
              {cartDetails[key].name} ({cartDetails[key].quantity})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Image
                src={cartDetails[key].image || ""}
                width={100}
                height={100}
                alt={cartDetails[key].name}
                className="object-cover"
              />
              <CardDescription className="flex-grow ml-4">
                {cartDetails[key].description}
              </CardDescription>
              <p className="text-lg font-semibold">
                {cartDetails[key].formattedValue}
              </p>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-700"
                onClick={() => {
                  toast({
                    title: `${cartDetails[key].name} foi removido do carrinho 🛒`,
                  });
                  removeItem(cartDetails[key].id);
                }}
              >
                <Trash2 size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    {cartCount && cartCount > 0 && (
      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="default"
          size="lg"
          onClick={checkout}
          disabled={isCheckingOut}
          className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition duration-300"
        >
          {isCheckingOut ? (
            <Loader className="animate-spin" />
          ) : (
            "Finalizar Compra"
          )}
        </Button>
      </div>
    )}
  </section>
);
};
 

export default Cart;