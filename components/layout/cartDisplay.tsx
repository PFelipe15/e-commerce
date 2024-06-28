// import React, { useState } from "react";
// import { useShoppingCart } from "use-shopping-cart";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { ArrowLeft, CircleMinus, Loader, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
// import Link from "next/link";
// import { SignInButton, useUser } from "@clerk/nextjs";
// import { ToastAction } from "@radix-ui/react-toast";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutPage from "./CheckoutPage";
// import convertToSubcurrency from "@/lib/convertToSubcurrency";
// import { useCartStore } from "@/store";
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// const CartDisplay: React.FC = () => {
//   const [isCheckingOut, setIsCheckingOut] = useState<boolean | undefined>(
//     false
//   );
//   const [address, setAddress] = useState<string>("");
//   const [city, setCity] = useState<string>("");
//   const [state, setState] = useState<string>("");

//   const { toast } = useToast();

//   const { user } = useUser();

//   async function checkout() {
    

//     if (!user) {
//       toast({
//         type: "background",
//         title: "Checkout",
//         description: "Você precisa estar logado para finalizar a compra.",
//         duration: 5000,

//         action: (
//           <ToastAction altText="Try again">
//             {" "}
//             <SignInButton mode="modal" forceRedirectUrl={"/"}>
//               <Button className="w-full flex gap-2">Entrar</Button>
//             </SignInButton>
//           </ToastAction>
//         ),
//       });
//       setIsCheckingOut(false);
//       return;
//     }

//     if (!address.trim() || !city.trim() || !state.trim()) {
//       toast({
//         title: "Endereço",
//         description: "Por favor, preencha todos os campos para continuar.",
//         variant: "destructive",
//       });
//       setIsCheckingOut(false);
//       return;
//     }

// console.log( cartDetails)

//     setIsCheckingOut(true);

     
//   }

//   function removeOrDecrementItem(quantity: number, id: string, name: string) {
//     if (quantity > 1) {
//       decrementItem(id);
//     } else {
//       toast({
//         title: "Carrinho",
//         description: `${name} foi removido do carrinho 🛒`,
//         variant: "destructive",
//       });
//       removeItem(id);
//     }
//   }
//   const useStore = useCartStore()
//   return (
    // <section className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-100 h-screen">
    //     <Button onClick={()=>{
    //       useStore.toggleCart();
    //     }} className="absolute outline-none px-3 out right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
    //     <X className="h-4 w-4" />
    //     <span className="sr-only">Close</span>
    //   </Button>
    //   <h1 className="text-2xl p-2 text-primary rounded-md">
    //     Carrinho de Compras 🛒
    //   </h1>
    //   <div className="w-full max-w-lg overflow-y-auto flex-grow">
    //     {cartDetails &&
    //       Object.keys(cartDetails).map((key) => (
    //         <Card
    //           key={cartDetails[key].id}
    //           className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-4"
    //         >
    //           <CardHeader className="bg-primary p-4">
    //             <CardTitle className="text-base font-bold text-white">
    //               {cartDetails[key].name} ({cartDetails[key].quantity})
    //             </CardTitle>
    //           </CardHeader>
    //           <CardContent className="p-4 flex items-center">
    //             <Image
    //               src={cartDetails[key].image || ""}
    //               width={75}
    //               height={75}
    //               alt={cartDetails[key].name}
    //               className="object-cover rounded-md"
    //             />
    //             <div className="flex  items-center justify-between gap-2 flex-grow ml-4">
    //               <p className="text-lg font-semibold">
    //                 Preço: {cartDetails[key].formattedValue}
    //               </p>
    //               <div className="flex gap-2">
    //                 <Button
    //                   variant="ghost"
    //                   className="text-red-500 hover:text-red-700"
    //                   onClick={() => {
    //                     removeOrDecrementItem(
    //                       cartDetails[key].quantity,
    //                       cartDetails[key].id,
    //                       cartDetails[key].name
    //                     );
    //                   }}
    //                 >
    //                   <CircleMinus size={20} />
    //                 </Button>
    //                 <Link
    //                   href={`/products/${cartDetails[key].id}`}
    //                   className="text-white p-2 px-3 rounded-md bg-primary hover:text-black"
    //                 >
    //                   Detalhes
    //                 </Link>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       ))}
    //   </div>
    //   {useStore.onCheckout === 'cart' && useStore.cart.length > 0 ? (
    //     <div className="flex justify-center flex-col items-center gap-4 mt-4">
    //       <Dialog>
    //         <DialogTrigger asChild>
    //           <Button>Finalizar Compra</Button>
    //         </DialogTrigger>
    //         <DialogContent className="sm:max-w-[425px]">
    //           <DialogHeader>
    //             <DialogTitle>Informe seu endereço</DialogTitle>
    //           </DialogHeader>
    //           <div className="grid gap-4 py-4">
    //             <div className="grid grid-cols-4 items-center gap-4">
    //               <Label htmlFor="address" className="text-right col-span-1">
    //                 Endereço
    //               </Label>
    //               <Input
    //                 id="address"
    //                 value={address}
    //                 onChange={(e) => setAddress(e.target.value)}
    //                 className="col-span-3"
    //                 placeholder="Digite seu endereço"
    //               />
    //             </div>
    //             <div className="grid grid-cols-4 items-center gap-4">
    //               <Label htmlFor="city" className="text-right col-span-1">
    //                 Cidade
    //               </Label>
    //               <Input
    //                 id="city"
    //                 value={city}
    //                 onChange={(e) => setCity(e.target.value)}
    //                 className="col-span-3"
    //                 placeholder="Digite sua cidade"
    //               />
    //             </div>
    //             <div className="grid grid-cols-4 items-center gap-4">
    //               <Label htmlFor="state" className="text-right col-span-1">
    //                 Estado
    //               </Label>
    //               <Input
    //                 id="state"
    //                 value={state}
    //                 onChange={(e) => setState(e.target.value)}
    //                 className="col-span-3"
    //                 placeholder="Digite seu estado"
    //               />
    //             </div>
    //             <p className="text-sm text-gray-600">
    //               Ao realizar o pedido, você concorda com nossa política de
    //               entrega. Faremos o possível para entregar seu pedido no prazo
    //               estipulado.
    //             </p>
    //           </div>
    //           <DialogFooter>
    //             <Button
    //               onClick={() => {
    //                 checkout();  
    //               }}
    //             >
    //               Confirmar
    //             </Button>
    //           </DialogFooter>

    //           {isCheckingOut && (
    //             <Elements
    //               stripe={stripePromise}
    //               options={{
    //                 mode: "payment",
    //                 amount: convertToSubcurrency(totalPrice) ,
    //                 currency: "brl",
    //               }}
    //             >
    //               <CheckoutPage amount={convertToSubcurrency(totalPrice)} />
    //             </Elements>
    //           )}
    //         </DialogContent>
    //       </Dialog>
    //       <p className="text-primary font-bold">Total: {formattedTotalPrice}</p>
    //     </div>
    //   ) : (
    //     <div className="text-center">
    //       <p className="text-xl font-semibold mb-4">
    //         Que pena, seu carrinho está vazio 😢
    //       </p>
    //       <div className="flex gap-4 items-center justify-center">
    //         <Link href={"/products/all"}>
    //           <Button>Produtos</Button>
    //         </Link>
    //         <Link href={"/"} >
    //           <Button onClick={()=>{
    //             useStore.toggleCart()
    //           }} className="bg-primary flex gap-1">
    //             <ArrowLeft size={20} /> Fechar
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //   )}

    //   {useStore.onCheckout === 'checkout'}
    // </section>
//   );
// };

// export default CartDisplay;


'use client';
 import { useCartStore } from '@/store';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CheckoutButton from './CheckoutButton';
import Checkout from './Checkout';
import OrderCompleted from '././OrderCompleted';
import { formatPrice } from './../../lib/formatPrice';
import { useShoppingCart } from 'use-shopping-cart';
import { ArrowLeft, CircleMinus } from 'lucide-react';
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