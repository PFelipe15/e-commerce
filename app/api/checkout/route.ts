import { NextResponse, NextRequest } from "next/server";
import stripe from "@/lib/stripe";
import Stripe from "stripe";
import { validateCartItems } from "use-shopping-cart/utilities";
import { Product } from "use-shopping-cart/core";
export async function POST(request: NextRequest) {
  try {
    const cartDetails = await request.json();
    const baseUrl = request.headers.get("origin");

    const stripeInventory = await stripe.products.list({
      expand: ["data.default_price"],
    });

    const products = stripeInventory.data.map((p: Stripe.Product): Product => {
      return {
        id: p.id.toString(),
        name: p.name,
        price: (p.default_price as Stripe.Price)?.unit_amount ?? 0,
        currency: (p.default_price as Stripe.Price)?.currency ?? "BRL",
        images: p.images[0],
      };
    });

    const line_itens = validateCartItems(products, cartDetails);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: line_itens,
      success_url: `${baseUrl}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

 
    return NextResponse.json(session, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 200 });
  }
}
