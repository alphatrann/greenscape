"use client";
import { DOTS } from "@/constants";
import { Button } from "@/features/ui/button";
import { useQueryStore } from "../hooks";
import { usePagination } from "./use-pagination";

interface PaginationProps {
  totalCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({ totalCount }) => {
  const currentPage = useQueryStore((state) => state.page);
  const update = useQueryStore((state) => state.update);
  const paginationRange = usePagination({
    currentPage,
    totalCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    update({ page: currentPage + 1 });
  };

  const onPrevious = () => {
    update({ page: currentPage - 1 });
  };

  return (
    <nav className="flex justify-center lg:justify-between items-center">
      <Button
        disabled={currentPage === 1}
        onClick={onPrevious}
        variant="outline"
        className="lg:flex hidden"
      >
        Previous
      </Button>
      <div className="items-center flex gap-x-2">
        {paginationRange.map((page, i) =>
          page === DOTS ? (
            <span key={i} className="font-medium">
              {DOTS}
            </span>
          ) : (
            <Button
              key={i}
              onClick={() =>
                currentPage !== page ? update({ page: page as number }) : {}
              }
              variant={currentPage === page ? "default" : "outline"}
            >
              {page}
            </Button>
          )
        )}
      </div>
      <Button
        onClick={onNext}
        disabled={currentPage === paginationRange.at(-1)}
        variant="outline"
        className="lg:flex hidden"
      >
        Next
      </Button>
    </nav>
  );
};
