  import { NextResponse } from 'next/server';
import stripe from './../../../lib/stripe';
import { Product } from '@/types';
import { auth } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';
import db from '@/lib/db';

const calculateOrderAmount = (items: Product[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.price! * item.quantity!
  }, 0)
  return totalPrice
}

export async function POST(req: Request) {
  const { userId } = auth();
  const { items, payment_intent_id } = await req.json();

  if(!userId){
    return new Response("Unauthorized", { status: 401 });
  }

  const customerIdTemp = 'cus_OvJFglQZ0DNK3i';
  const total = calculateOrderAmount(items);

  const orderData = {
    user: { connect: { id: 1 } },
    amount: total,
    currency: 'brl',
    status: 'pending',
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item: Product) => ({
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        image: item.image
      }))
    }
  }

  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
        amount: total
      });

      const [existing_order, updated_order] = await Promise.all([
        db.order.findFirst({
          where: { paymentIntentID: payment_intent_id },
          include: { products: true }
        }),
        db.order.update({
          where: { paymentIntentID: payment_intent_id },
          data: {
            amount: total,
            products: {
              deleteMany: {},
              create: items.map((item: Product) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image
              }))
            }
          }        
        })
      ]);

      if (!existing_order) {
        return new Response("Order not found", { status: 404 });
      }

      return NextResponse.json({ paymentIntent: updated_intent }, { status: 200})
    }

  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'brl',
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentID = paymentIntent.id;

    const newOrder = await db.order.create({
      data: orderData
    })
    
    return NextResponse.json({ paymentIntent }, { status: 200})
  }

}