"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/features/ui/select";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQueryStore } from "../hooks";

export const SortSelect = () => {
  const sortBy = useQueryStore((state) => state.sortBy);
  const order = useQueryStore((state) => state.order);
  const update = useQueryStore((state) => state.update);

  const searchParams = useSearchParams();

  useEffect(() => {
    const sortByQuery = searchParams.get("sortBy");
    const orderQuery = searchParams.get("order");
    if (sortByQuery && orderQuery && ["asc", "desc"].includes(orderQuery)) {
      update({ sortBy: sortByQuery, order: orderQuery as "asc" | "desc" });
    }
  }, [searchParams]);

  return (
    <Select
      onValueChange={(val) => {
        const [sortBy, order] = val.split(":");
        update({
          sortBy: sortBy || null,
          order: (order as "asc" | "desc") || null,
        });
      }}
      value={`${sortBy || ""}:${order || ""}`}
    >
      <SelectTrigger className="w-[180px] font-medium">
        {sortBy === "id" && order === "asc" ? "Sort" : <SelectValue />}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value=":">None</SelectItem>
        <SelectItem value="orders:desc">Most popular</SelectItem>
        <SelectItem value="createdAt:desc">Newest</SelectItem>
        <SelectItem value="price:asc">Price: Low to High</SelectItem>
        <SelectItem value="price:desc">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
};
