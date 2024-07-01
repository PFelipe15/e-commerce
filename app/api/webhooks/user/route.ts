import db from "@/lib/db";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import stripe from "@/lib/stripe";

const webhookSecret = process.env.CLERCK_WEBHOOK_SECRET || ''

type EventType = 'user.created' | 'user.updated' | '*';
type Event = {
  data: EventDataType;
  object: "event";
  type: EventType;
};

type EventDataType = {
  id: string;
  first_name: string;
  last_name: string;
  email_addresses: EmailAddressType[];
  primary_email_address_id: string;
  attributes: Record<string, string | number>;
  
};

type EmailAddressType = {
  id: string;
  email_address: string
};
async function handler(request:Request ){
  const payload = await request.json();
  const headerList = headers()
  const heads = {
    "svix-id":headerList.get('svix-id'),
    'svix-timestamp':headerList.get('svix-timestamp'),
    'svix-signature':headerList.get('svix-signature'),
  }
  const wh = new Webhook(webhookSecret)
  let evt:Event|null = null


  try {
    evt = wh.verify(
        JSON.stringify(payload),
        heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event
  } catch (err) {
    console.error((err as Error).message)
    return NextResponse.json({}, {status:400})
  }

const eventType:EventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated'){
    const {
        id,
        first_name,
        last_name,
        email_addresses,
        primary_email_address_id,
        ...attributes
      } = evt.data



  const hasCustomer = await db?.user.findUnique({
    where:{
      externalId: id as string,
    }
  })
      
let customer

  if(hasCustomer && hasCustomer.stripeCustomerId){


    
    customer = await stripe.customers.update(hasCustomer.stripeCustomerId,{
      name: `${first_name} ${last_name}`,
      email: email_addresses? email_addresses[0].email_address : "",


      })} else{
    customer= await stripe.customers.create({
      name: `${first_name} ${last_name}`,
      email: email_addresses? email_addresses[0].email_address : "",
  })
} 

      await db?.user.upsert({
        where: { externalId: id as string },
        create: {
          externalId:id as string,
          stripeCustomerId: customer.id,
          attributes,
        },
        update: {
          attributes,
        },
      });
    }

    return NextResponse.json({}, {status:200})

  }



export const GET = handler
export const POST =handler
export const PUT =handler