import { NextResponse } from "next/server";
import stripe from "./../../../lib/stripe";
import type { Product } from "@/types";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

const calculateOrderAmount = (items: Product[]) => {
	const totalPrice = items.reduce((acc, item) => {
		return acc + Number(item.price) * (item.quantity ?? 0);
	}, 0);
	return Math.round(totalPrice * 100);
};
export async function POST(req: Request) {
	const { userId } = auth();
	const { items, payment_intent_id } = await req.json();

	if (!userId) {
		return new Response("Unauthorized", { status: 401 });
	}

	const total = calculateOrderAmount(items);
	const currentUser = await db.user.findUnique({
		where: {
			externalId: userId,
		},
	});

	if (!currentUser) {
		return new Response("User not found", { status: 404 });
	}

	const orderData = {
		user: { connect: { id: currentUser.id } },
		amount: total,
		currency: "brl",
		status: "pending",
		paymentIntentID: payment_intent_id,
		products: {
			create: items.map((item: Product) => ({
				name: item.name,
				description: item.description,
				quantity: item.quantity,
				price: item.price,
				image: item.image,
			})),
		},
	};

	if (payment_intent_id) {
		const current_intent =
			await stripe.paymentIntents.retrieve(payment_intent_id);

		if (current_intent) {
			const updated_intent = await stripe.paymentIntents.update(
				payment_intent_id,
				{
					amount: total,
				},
			);

			const [existing_order, updated_order] = await Promise.all([
				db.order.findFirst({
					where: { paymentIntentID: payment_intent_id },
					include: { products: true },
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
								image: item.image,
							})),
						},
					},
				}),
			]);

			if (!existing_order) {
				return new Response("Order not found", { status: 404 });
			}

			return NextResponse.json(
				{ paymentIntent: updated_intent },
				{ status: 200 },
			);
		}
	} else {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: calculateOrderAmount(items),
			currency: "brl",
			automatic_payment_methods: { enabled: true },
		});

		orderData.paymentIntentID = paymentIntent.id;

		const newOrder = await db.order.create({
			data: orderData,
		});

		return NextResponse.json({ paymentIntent }, { status: 200 });
	}
}
