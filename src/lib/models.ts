import type { ImageMetadata } from "astro";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating?: number;
  quantity?: number;
  src: ImageMetadata | string;
}
