'use client'
import React from 'react';
import { Product } from "@/types";
import { Button } from "../ui/button";
import Image from "next/image";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { ToastAction } from '@radix-ui/react-toast';
import { Link } from 'lucide-react';
import { toast } from '../ui/use-toast';

interface ProductProps {
    id: string;
    name: string;
    description: string | undefined;
    price: string | number;
    currency: string;
    images: string[];
    image: string;
  }

const ProductDetails: React.FC<ProductProps> = ( product  ) => {
    const { addItem } = useShoppingCart();

  const formattedPrice = formatCurrencyString({
    value: Number(product.price),
    currency: "BRL",
    language: "pt-BR"
  });

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href, 
      });
    } else {
      alert('Compartilhamento não suportado neste navegador.');
    }
  };

  const addToCart = async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    addItem({
      name: product.name,
      description: product.description,
      id: product.id,
      price: Number(product.price),
      currency: product.currency,
      image: product.image,
    });

    toast({
      title: `🎉 ${product.name} Adicionado`,
      description: "Quanto mais, melhor!",
      action: (
        <ToastAction
          className="bg-primary text-white"
          altText="Goto schedule to undo"
        >
          <Link href={"/cart"} >Ver Carrinho</Link>
        </ToastAction>
      ),
    });
  }

  return (
    <div className="flex flex-col md:flex-row py-4 items-center justify-center gap-8">
      <div className=" w-3/4  md:w-[400px] bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="object-cover  "
        />
      </div>
      <div className=" w-3/4 md:w-1/4">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <span className="text-xl font-bold mb-4 block">{formattedPrice}</span>
        <div className="flex flex-col  gap-4">
          <Button onClick={addToCart} className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark">
            Adicionar ao Carrinho
          </Button>
          <Button onClick={shareProduct} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">
            Compartilhar Produto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
