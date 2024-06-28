import React from 'react';
import stripe from '@/lib/stripe';
import { DummyProduct } from '@/types';

async function getDummyProducts(){
  const response = await fetch("https://dummyjson.com/products?limit=15");
  const dummyData = await response.json();

  const products = dummyData.products.map((p:DummyProduct)=>{
    return {
      id: p.id,
      description: p.description,
      name: p.title,
      images: p.images,
      default_price_data: {
        unit_amount_decimal: p.price,
        currency: "BRL",
      },
    };
  })
   return products;
}

async function seedDummyData(){
  const products = await getDummyProducts();

  await products.map(async (product: any) => {
    try {
      const productCreated = await stripe.products.create(product);
 
    } catch (e: any) {
      console.log("STRIEP CREATED ERROR: ", e.message);
    }
  });
}

const Seed: React.FC = async () => {
  await seedDummyData()
  return (
    <div className="container flex items-center justify-center">
      <h1 className="text-3xl tex-primary font-extrabold"> Dummy data foi criado, verifique seu console.log</h1>
    </div>
  );
}

export default Seed;