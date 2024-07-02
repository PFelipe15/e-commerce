'use client';
import { useCartStore } from '@/store';
import Image from 'next/image';
import CheckoutButton from './CheckoutButton';
import Checkout from './Checkout';
import OrderCompleted from './OrderCompleted';
import { formatPrice } from './../../lib/formatPrice';
import { CircleMinus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import Link from 'next/link';

export default function CartDrawer() {
  const useStore = useCartStore();

  const totalPriceAll = useStore.cart.reduce((acc, item) => {
    return acc + Number(item.price!) * item.quantity!;
  }, 0);

  return (
    <section className="flex flex-col items-center gap-4 p-6 bg-gray-100 h-screen">
      <div className="flex flex-col items-center w-full mb-4">
        <h1 className="text-2xl font-bold p-2 text-primary rounded-md">
          Carrinho de Compras 🛒
        </h1>
        <Button
          variant="link"
          onClick={() => useStore.toggleCart()}
          className="font-bold text-sm"
        >
          Voltar para loja
        </Button>
      </div>

      <div className="border-t border-gray-400 my-4 w-full"></div>

      {useStore.onCheckout === 'cart' && (
        <>
          <div className="w-full max-w-lg overflow-y-auto flex-grow">
            {useStore.cart.map((item) => (
              <Card
                key={item.id}
                className="w-full bg-white rounded-lg shadow-md overflow-hidden mb-4"
              >
                <CardHeader className="bg-primary p-4 flex justify-between items-center">
                  <CardTitle className="text-base font-bold text-white">
                    {item.name} ({item.quantity})
                  </CardTitle>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      useStore.removeProduct(item);
                    }}
                  >
                    <CircleMinus size={20} />
                  </Button>
                </CardHeader>
                <CardContent className="p-4 flex items-center">
                  <Image
                    src={item.image || ""}
                    width={75}
                    height={75}
                    alt={item.name}
                    className="object-cover rounded-md"
                  />
                  <div className="flex items-center justify-between gap-2 flex-grow ml-4">
                    <p className="text-lg font-semibold">
                      Preço: {formatPrice(Number(item.price))}
                    </p>
                    <Link
                      href={`/products/${item.id}`}
                      className="text-white p-2 rounded-md bg-primary hover:text-black"
                    >
                      Detalhes
                    </Link>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center p-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium">Total:</span>
                    <span className="ml-2 text-lg font-bold">{formatPrice(Number(item.price) * item.quantity!)}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="w-full max-w-lg mt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total do Carrinho:</span>
              <span className="text-xl font-bold">{formatPrice(totalPriceAll)}</span>
            </div>
            <CheckoutButton totalPrice={totalPriceAll} />
          </div>
        </>
      )}

      {useStore.onCheckout === 'checkout' && (
        <>
          <div className="w-full max-w-sm p-4 mb-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            <p className="font-semibold">Pagamento Pendente</p>
            <p>Você tem um pagamento pendente. Por favor, finalize o pagamento abaixo.</p>
          </div>
          <Checkout />
        </>
      )}

      {useStore.onCheckout === 'success' && <OrderCompleted />}
    </section>
  );
}
