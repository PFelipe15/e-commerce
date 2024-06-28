import stripe from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, res:NextResponse) {
 const payload = await req.text();
 const response = JSON.parse(payload)
 

 const sig = req.headers.get("Stripe-Signature")

const dateTime = new Date(response?.created * 1000 ).toLocaleDateString()
const timeString = new Date(response?.created * 1000 ).toLocaleDateString()

try {
    let event = stripe.webhooks.constructEvent({
        payload,
        sig,
        secret: process.env.STRIPE_WEBHOOK_SECRET!,
    })

    console.log('event', event.type)
    return NextResponse.json({status:"sucess", event: event.type}) 

} catch (error) {
   return NextResponse.json({status:"failed", error: error}) 
}
}