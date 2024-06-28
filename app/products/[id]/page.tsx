import ProductDetails from "@/components/shop/product-details"
import { Button } from "@/components/ui/button"
import stripe from "@/lib/stripe"
import Image from "next/image"
import Stripe from "stripe"

interface ProductParamsProps {
  params: {
    id: string;
  }
}

interface Product {
  id: string;
  name: string;
  description: string | undefined;
  price: string | number;
  currency: string;
  images: string[];
  image: string;
}

async function getProduct(id: string): Promise<Product> {
  const product = await stripe.products.retrieve(id);

  const price = await stripe.prices.list({
    product: product.id,
  })

  return {
    id: product.id.toString(),
    name: product.name,
    description: product.description || undefined,
    price: price.data[0].unit_amount || 0,
    currency: price.data[0].currency,
    images: product.images,
    image: product.images[0],
  }
}

export default async function Product({ params: { id } }: ProductParamsProps) {
  const product = await getProduct(id);


 return  <ProductDetails {...product} />;
  
}