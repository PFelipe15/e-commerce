export interface Product {
  id: string;
  price: number | null;
  name: string;
  quantity?: number | 1;
  image: string;
  description: string | null;
  currency?: string;
} 


export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
} 

 