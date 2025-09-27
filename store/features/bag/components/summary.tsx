"use client";

import { formatPrice } from "@/features/products/utils";
import { Button } from "@/features/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useBagStore } from "../contexts";

interface BagSummaryProps {
  total: number;
}

export const BagSummary = ({ total }: BagSummaryProps) => {
  const [mounted, setMounted] = useState(false);
  const bag = useBagStore((state) => state.bag);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onCheckout = async () => {
    try {
      const {
        data: { checkoutUrl },
      } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        bag: bag.map((item) => ({
          productId: item.id,
          qty: item.qty,
        })),
      });

      window.location = checkoutUrl;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  if (!mounted || bag.length === 0) return null;

  return (
    <section className="lg:col-span-5 h-fit lg:sticky mt-16 rounded-lg bg-gray-50 lg:top-6 lg:p-8 lg:mt-0 sm:p-6 py-6 px-4">
      <h2 className="text-gray-900 font-medium text-lg">Order summary</h2>
      <dl className="mt-6 space-y-4">
        <div className="flex justify-between pt-4 items-center">
          <dt className="text-gray-700 text-sm">Subtotal</dt>
          <dd className="text-gray-900 font-medium text-sm">
            {formatPrice(total)}
          </dd>
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-200 items-center">
          <dt className="text-gray-700 text-sm">Shipping estimate</dt>
          <dd className="text-gray-900 font-medium text-sm">
            Calculated at checkout
          </dd>
        </div>
        <div className="flex justify-between pt-4 border-t border-gray-200 items-center">
          <dt className="text-gray-900 font-medium text-base">Order total</dt>
          <dd className="text-gray-900 font-medium text-base">
            {formatPrice(total)}
          </dd>
        </div>
      </dl>
      <div className="mt-6">
        <Button onClick={onCheckout} size="lg" className="text-base w-full">
          Checkout
        </Button>
      </div>
    </section>
  );
};
