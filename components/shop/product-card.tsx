'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useToast } from '../ui/use-toast';
import { ToastAction } from '../ui/toast';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store';
import { Product } from '@/types';

interface ProductCardProps {
  id: string;
  name: string;
  sku?: string;
  description: string ;
  price: string | number | null;
  currency?: string | undefined;
  image: string;
  images?: string[];
  isHighlight?: boolean;
}

const ProductCard = ({ ...product }: ProductCardProps) => {
  const { toast } = useToast();
   const { addProduct } = useCartStore();
  const formatedPrice = formatCurrencyString({
    value: Number(product.price),
    currency: 'BRL',
    language: 'pt-BR',
  });

  const maxLength =  90; 
  const truncatedDescription = product.description.length > maxLength
    ? product.description.slice(0, maxLength - 3) + '...' 
    : product.description;


    const useStore = useCartStore();

    const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const productWithCorrectPriceType: Product = {
        ...product,
        price: Number(product.price),
      };
      addProduct(productWithCorrectPriceType);
    
      toast({
        title: ` ${product.name} Adicionado`,
        description: "Quanto mais, melhor!",
        action: (
          <Button className=" font-bold flex gap-2 items-center" onClick={() => {
            useStore.toggleCart();
          }}>
            Abrir Carrinho <ShoppingCart size={25} />
          </Button>
        ),
      });
    };

  return (
    <Card className={product.isHighlight ? 'max-w-[300px]' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center justify-center min-h-[2rem]">
          {product.name}
        </CardTitle>
        <CardDescription className="relative w-full h-60">
          <Image
            src={product.image}
            sizes="100%"
            fill
            className="object-contain"
            alt={product.name}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="min-h-[100px]">{truncatedDescription}</p>
      </CardContent>
      <CardFooter
        className={
          product.isHighlight
            ? 'flex flex-col items-center'
            : 'flex flex-col items-center gap-4'
        }
      >
        <div>
          <p className="font-extrabold text-2xl text-primary">{formatedPrice}</p>
        </div>
        <div className="flex gap-2 items-center flex-col-reverse">
          <Button size="lg" variant="default"       onClick={(e) => addToCart(e)}
          >
            Adicionar ao Carrinho
          </Button>
          <Link
            href={`/products/${product.id}`}
            className="bg-yellow-800 w-full transform hover:scale-105 transition duration-300 p-2 justify-center rounded-md flex items-center text-white"
          >
            Detalhes
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
