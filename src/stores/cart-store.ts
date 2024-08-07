import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "./product-store";

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: [...state.items.filter((i) => i.id !== id)],
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => {
        return get().items.length;
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
