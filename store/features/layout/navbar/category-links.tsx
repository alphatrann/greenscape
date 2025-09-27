"use client";
import { Category } from "../../categories/types";
import { useQueryProducts } from "../../products/hooks";
import { DesktopLinks } from "./desktop-links";
import { MobileLinks } from "./mobile-links";

export const CategoryLinks = ({ categories }: { categories: Category[] }) => {
  useQueryProducts(categories);

  return (
    <>
      <MobileLinks categories={categories} />
      <DesktopLinks categories={categories} />
    </>
  );
};
