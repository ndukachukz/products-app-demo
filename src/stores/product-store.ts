import { create } from "zustand";

export interface ProductReview {
  user_id: 1;
  rating: 5;
  comment: string;
}

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  discount: number;
  availability: true;
  brand: string;
  category: string;
  rating: number;
  reviews: ProductReview[];
}

interface ProductStore {
  product: Product | null;

  setProduct(product: Product): void;
}

const useProductStore = create<ProductStore>((set) => ({
  product: null,
  setProduct: (product: Product) => set((state) => ({ ...state, product })),
}));

export default useProductStore;
