import React from "react";
import stripe from "@/lib/stripe";
import { Product } from "@/types";
import Stripe from "stripe";
import ProductCard from "./product-card";
import Link from "next/link";

async function getProducts() {
  try {
    const stripeProducts = await stripe.products.list({
      limit: 8,
      expand: ["data.default_price"],
    });

    return stripeProducts.data.map((p: Stripe.Product): Product => {
      return {
        id: p.id.toString(),
        name: p.name,
        description: p.description ?? "",
        price: (p.default_price as Stripe.Price)?.unit_amount_decimal ?? 0,
        currency: (p.default_price as Stripe.Price)?.currency ?? "BRL",
        images: p.images,
        image: p.images[0],
      };
    });
  } catch (error: any) {
    console.log(error);
  }
}

async function getProductsHighlight() {
  try {
    const stripeProducts = await stripe.products.search({
      query: "active:'true' AND metadata['categoria']:'destaque'",
      expand: ["data.default_price"],
    });

    return stripeProducts.data.map((p: Stripe.Product): Product => {
      return {
        id: p.id.toString(),
        name: p.name,
        description: p.description ?? "",
        price: (p.default_price as Stripe.Price)?.unit_amount_decimal ?? 0,
        currency: (p.default_price as Stripe.Price)?.currency ?? "BRL",
        images: p.images,
        image: p.images[0],
      };
    });
  } catch (error: any) {
    console.log(error);
  }
}

const ProductList: React.FC = async () => {
  const products = await getProducts();
  return (
    <div>
      <div className="flex justify-between ">
        <h1 className="font-bold text-2xl text-primary ">Novidades</h1>
        <Link className="text-primary font-bold hover:text-pink-700  " href={"/products/all"}>
          Ver Todas as Pecas
        </Link>
      </div>
      <section className="grid gap-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
        {products?.map((p) => (
          <ProductCard {...p} description={p.description? p.description :''} isHighlight={false} key={p.id} />
        ))}
      </section>
    </div>
  );
};

const ProductListHighlight: React.FC = async () => {
  const products = await getProductsHighlight();

  return (
    <div className="flex items-center justify-center  rounded-md">
      <section className=" grid gap-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  ">
        {products?.map((p) => (
          <ProductCard {...p}  description={p.description? p.description :''} isHighlight={true} key={p.id} />
        ))}
      </section>
    </div>
  );
};


export {ProductList,ProductListHighlight}