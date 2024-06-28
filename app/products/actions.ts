'use server'
 import stripe from "@/lib/stripe";
import Stripe from "stripe";


export async function fetchAllProducts({
  lastProductId,
}: {
  lastProductId?: string | undefined;
}) {
  const params = lastProductId
    ? { starting_after: lastProductId, limit: 8, expand: ["data.default_price"], }
    : { limit: 8, expand: ["data.default_price"],};

  const { data: products, has_more } = await stripe.products.list(params);

  const formatedProducts = products.map((p: Stripe.Product) => {
    return {
      id: p.id.toString(),
      name: p.name,
      description: p.description ?? "",
      price: (p.default_price as Stripe.Price)?.unit_amount_decimal ?? "0",
      currency: (p.default_price as Stripe.Price)?.currency ?? "BRL",
      images: p.images,
      image: p.images[0],
    };
  });
  return { formatedProducts, has_more };
}