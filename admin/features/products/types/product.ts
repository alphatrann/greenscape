import { Category } from "@/features/categories/types";

export enum Status {
  Active = "Active",
  Draft = "Draft",
  Archived = "Archived",
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  desc: string;
  price: number;
  status: Status;
  inStock: number;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
  images: ProductImage[];
  _count: { orders: number };
}
export interface ProductImage {
  file: {
    id: string;
    url?: string;
  };
}
export interface ProductFormDto {
  name: string;
  slug: string;
  desc: string;
  price: number;
  inStock: number;
  status: "Active" | "Draft" | "Archived";
  categoryIds: number[];
}

export interface StatusGroup {
  _count: { id: number };
  status: Status;
}

export interface InStockGroup {
  _count: { id: number };
  inStock: number;
}
