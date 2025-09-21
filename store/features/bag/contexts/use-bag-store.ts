import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { BagItem } from "../types";
import { toast } from "react-hot-toast";

interface BagStore {
  bag: BagItem[];
  getTotalQty: () => number;
  findBagItem: (id: number) => BagItem | undefined;
  addToBag: (bagItem: BagItem) => void;
  updateQty: (id: number, qty: number) => void;
  removeBagItem: (id: number) => void;
  clearBag: () => void;
}

export const useBagStore = create(
  persist<BagStore>(
    (set, get) => ({
      bag: [],
      totalPrice: 0,
      findBagItem: (id) => get().bag.find((item) => item.id === id),
      getTotalQty: () => get().bag.reduce((sum, item) => (sum += item.qty), 0),
      addToBag: (bagItem) => {
        set({ bag: [...get().bag, bagItem] });
        toast.success("Item added to bag");
      },
      updateQty: (id, qty) => {
        set({
          bag: get().bag.map((item) =>
            item.id === id ? { ...item, qty } : item
          ),
        });
        toast.success("Quantity updated");
      },
      removeBagItem: (id) => {
        set({ bag: get().bag.filter((item) => item.id !== id) });
        toast.success("Item removed from bag");
      },
      clearBag: () => {
        set({ bag: [] });
        toast.success("Bag cleared");
      },
    }),
    {
      name: "bag-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
