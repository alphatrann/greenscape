import { Related } from "@/features/bag/components/related";
import { BagClient } from "@/features/bag/components";
import { Breadcrumb } from "@/features/ui/breadcrumb";

export const metadata = {
  title: "Shopping Bag",
};

export default function BagPage() {
  return (
    <div className="pb-24 container max-w-7xl pt-16 px-4 sm:px-6 lg:px-8">
      <Breadcrumb links={[{ name: "Bag", href: "#" }]} />
      <h1 className="font-bold mt-6 tracking-tight sm:text-4xl text-3xl">
        Shopping Bag
      </h1>

      <BagClient />
      <Related />
    </div>
  );
}
