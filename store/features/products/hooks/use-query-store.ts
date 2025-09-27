import { create } from "zustand";

interface State {
  minPrice: number | null;
  maxPrice: number | null;
  selectedCategory: string | null;
  outOfStockIncluded: boolean;
  sortBy: string | null;
  order: "desc" | "asc" | null;
  page: number;
}

interface Action {
  update: (newState: Partial<State>) => void;
  reset: () => void;
}

const initialState: State = {
  minPrice: null,
  maxPrice: null,
  selectedCategory: null,
  outOfStockIncluded: true,
  sortBy: null,
  order: null,
  page: 1,
};

export const useQueryStore = create<State & Action>((set) => ({
  ...initialState,
  update: (newState) => set((prevState) => ({ ...prevState, ...newState })),
  reset: () => set(({ page }) => ({ ...initialState, page })),
}));
