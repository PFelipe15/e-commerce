'use client'

import { Check } from "lucide-react"
import { useEffect } from "react"
import { useShoppingCart } from "use-shopping-cart"

interface SuccessProps{
    params:{
        sessionId:string
    }
}

export default function Success ({params}:SuccessProps){
const { clearCart} = useShoppingCart()
useEffect(()=>{
clearCart();
},[])

     return (
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
         <div className="bg-white p-6 rounded-lg shadow-lg">
           <Check className="text-green-500 text-6xl mx-auto" />
           <h1 className="text-2xl font-bold text-center mt-4">
             Compra Realizada com Sucesso!
           </h1>
           <p className="text-gray-600 text-center mt-2">
             Obrigado por comprar conosco. Sua sessão de compra foi concluída
             com o ID: <span className="font-semibold">{params.sessionId}</span>
           </p>
           <div className="mt-6 flex- items-center">
             <a
               href="/"
               className="bg-primary text-white px-4 py-2 rounded-md text-1xl font-medium hover:bg-primary-dark transition duration-300"
             >
               Voltar para a Loja
             </a>
           </div>
         </div>
       </div>
     );
}

    
 