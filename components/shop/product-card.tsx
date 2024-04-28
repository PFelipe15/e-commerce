'use client'
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
 import { formatCurrencyString,useShoppingCart } from 'use-shopping-cart';
import { Button } from '../ui/button';
import Image from "next/image";
import { useToast } from '../ui/use-toast';
interface ProductCardProps{
    id: string;
    name: string;
    sku?:string;
    description: string;
    price: string | number;
    currency: string;
    image: string;
    images?: string[];
}
 
const ProductCard = ({ ...product }: ProductCardProps) => {
  const { toast } = useToast()

const { addItem } = useShoppingCart();
const formatedPrice = formatCurrencyString({
  value: Number(product.price),
  currency:"BRL",
  language:"pt-BR"
});
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
       });
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center min-h-[4rem]">
          {product.name}
        </CardTitle>
        <CardDescription className="relative w-full h-60">
          <Image src={product.image} sizes="100%" fill className="object-contain" alt={product.name}/>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <p className="min-h-[6rem]">{product.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>
          <p>Preço</p>
          <p>{formatedPrice}</p>
        </div>
        <Button size={"lg"} variant={"default"} onClick={addToCart}>
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;