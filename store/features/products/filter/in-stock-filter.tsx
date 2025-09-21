import { Checkbox } from "@/features/ui/checkbox";
import { Label } from "@/features/ui/label";
import { useQueryStore } from "@/features/products/hooks";

export const InStockFilter = () => {
  const isFetching = useQueryStore((state) => state.isFetching);
  const outOfStockIncluded = useQueryStore((state) => state.outOfStockIncluded);
  const update = useQueryStore((state) => state.update);

  return (
    <div className="pt-4">
      <Label className="mb-4 block">Availability</Label>
      <div className="flex items-center gap-x-3">
        <Checkbox
          checked={!outOfStockIncluded}
          onCheckedChange={() =>
            update({ outOfStockIncluded: !outOfStockIncluded })
          }
          disabled={isFetching}
        />
        <Label className="font-normal">Don&apos;t include out of stock</Label>
      </div>
    </div>
  );
};
