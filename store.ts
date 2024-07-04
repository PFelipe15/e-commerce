import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product as ProductType } from './types/index';

type CartState = {
  cart: ProductType[];
  addProduct: (product: ProductType) => void;
  removeProduct: (product: ProductType) => void;
  isOpen: boolean;
  toggleCart: () => void;
  clearCart: () => void;
  onCheckout: string;
  setCheckout: (checkout: string) => void;
  paymentIntent: string;
  setPaymentIntent: (paymentIntent: string) => void;
  stepCart: number;
  setStepCart: (step: number) => void;  // Adicionando a definição de setStepCart
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      addProduct: (item) =>
        set((state) => {
          const product = state.cart.find((p) => p.id === item.id);

          if (product) {
            const updatedCart = state.cart.map((p) => {
              if (p.id === item.id) {
                return { ...p, quantity: p.quantity ? p.quantity + 1 : 1 };
              }
              return p;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item) =>
        set((state) => {
          const existingProduct = state.cart.find((p) => p.id === item.id);

          if (existingProduct && existingProduct.quantity! > 1) {
            const updatedCart = state.cart.map((p) => {
              if (p.id === item.id) {
                return { ...p, quantity: p.quantity! - 1 };
              }
              return p;
            });
            return { cart: updatedCart };
          } else {
            const filteredCart = state.cart.filter((p) => p.id !== item.id);
            return { cart: filteredCart };
          }
        }),
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      onCheckout: 'cart',
      stepCart: 1,

      setCheckout: (checkout) => set(() => ({ onCheckout: checkout })),
      paymentIntent: '',
      setPaymentIntent: (paymentIntent) => set(() => ({ paymentIntent })),
      clearCart: () => set(() => ({ cart: [] })),
      
      setStepCart: (step) => set(() => ({ stepCart: step })),  // Implementando a função setStepCart
    }),
    { name: 'cart-storage' }
  )
);
