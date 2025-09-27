"use client";
import { PriceInput } from "@/features/common/components";
import { Button } from "@/features/ui/button";
import { Label } from "@/features/ui/label";
import { useQueryStore } from "../hooks/use-query-store";

export const PriceFilter = () => {
  const minPrice = useQueryStore((state) => state.minPrice);
  const maxPrice = useQueryStore((state) => state.maxPrice);
  const update = useQueryStore((state) => state.update);

  return (
    <div className="pt-4 space-y-4">
      <Label className="flex-1">Price</Label>
      <div className="flex gap-x-4">
        <div className="space-y-2">
          <Label>Min</Label>
          <PriceInput
            value={minPrice ? minPrice.toString() : ""}
            onChange={(e) => update({ minPrice: +e.target.value || null })}
          />
        </div>
        <div className="space-y-2">
          <Label>Max</Label>
          <PriceInput
            value={maxPrice ? maxPrice.toString() : ""}
            onChange={(e) => update({ maxPrice: +e.target.value || null })}
          />
        </div>
      </div>
      {minPrice || maxPrice ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            update({ minPrice: null, maxPrice: null });
          }}
        >
          Reset
        </Button>
      ) : null}
    </div>
  );
};
