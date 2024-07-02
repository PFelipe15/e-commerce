'use client'

import { useCartStore } from "@/store";
import { useEffect } from "react";
import { FaCheckCircle } from 'react-icons/fa';
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
function OrderCompleted() {
  const cartStore = useCartStore();
const {toast} = useToast()

  useEffect(() => {
    cartStore.setPaymentIntent("");
    cartStore.clearCart();
    toast({
      type: "background",
      title: "Checkout",
      description: "Parabéns. compra realizada com sucesso, aguarde no seu email mais informações",
      duration: 5000,
  
  })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-sm flex flex-col items-center justify-center h-full p-4 text-center">
      <FaCheckCircle size={64} className="text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-primary mb-4">Pedido concluído com sucesso</h1>
      <p className="text-lg text-gray-700 mb-8">Obrigado pela sua compra! Seu pedido foi processado com sucesso.</p>
      <Button
        className=" text-white py-2 px-6 rounded-md hover:bg-primary-dark transition duration-300"
        onClick={() => {
          setTimeout(() => {
            cartStore.setCheckout("cart");          
          }, 1000);
          cartStore.toggleCart();
        }}
      >
        Voltar para a loja
      </Button>
    </div>
  );
}

export default OrderCompleted;
