'use client';
import { formatPrice } from '@/lib/formatPrice';
 import { useCartStore } from '@/store';
import { SignInButton, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
 import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';

type CheckoutButtonProps = {
  totalPrice: number;
};

export default function CheckoutButton({ totalPrice }: CheckoutButtonProps) {
   const { user } = useUser();
  const cartStore = useCartStore();
   const { toast } = useToast();

  const handleCheckout = async () => {


    if(!user){  
        toast({
              type: "background",
              title: "Checkout",
              description: "Você precisa estar logado para finalizar a compra.",
              duration: 5000,
      
              action: (
                <ToastAction altText="Try again">
                  {" "}
                  <SignInButton mode="modal" forceRedirectUrl={"/"}>
                    <Button className="w-full flex gap-2"  onClick={()=>{cartStore.toggleCart()}}  >Entrar</Button>
                  </SignInButton>
                </ToastAction>
              ),
            });
             return;
    }
    cartStore.setCheckout('checkout');
  };

  return (
    <div className = "flex flex-col items-center" >
      <p className=' font-bold'>
        Total: {formatPrice(totalPrice)}
      </p>
      <Button
        onClick={handleCheckout}
        className='w-full rounded-md    '
      >
        Finalizar Compra
      </Button>
    </div>
  );
}