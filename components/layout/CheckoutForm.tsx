"use client";

import { formatPrice } from "@/lib/formatPrice";
import { useCartStore } from "@/store";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setLoading] = useState(false);
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + Number(item.price!) * item.quantity!;
  }, 0);

  const formattedPrice = formatPrice(totalPrice);

  useEffect(() => {
    if (!stripe) return;
    if (!clientSecret) return;
  }, [clientSecret, stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          cartStore.setCheckout("success");
        }
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form" className="space-y-1 w-full">
      <PaymentElement id="payment-element" options={{ layout: "tabs" }}    />
      <div className="flex flex-col items-center"> 

      <h1 className="py-4 font-bold text-xl text-center">Total: {formattedPrice}</h1>
      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="  text-white py-2 px-4 rounded-md transition duration-300"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Carregando...
          </span>
        ) : (
          "Finalizar compra"
        )}
      </Button>
      </div>
    </form>
  );
}

export default CheckoutForm;
