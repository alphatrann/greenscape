import { aggregateOrders, getOrders } from "@/features/orders/actions";
import { OrdersTable } from "@/features/orders/table";
import { Breadcrumb } from "@/features/ui/breadcrumb";
import { getCurrentUser } from "@/features/user/utils";
import { redirect } from "next/navigation";
import qs from "query-string";

export const metadata = {
  title: "Orders",
};

interface OrdersPageProps {
  searchParams: Promise<{
    limit?: string;
    offset?: string;
    q?: string;
    totalRange?: string;
    from?: string;
    to?: string;
    countries?: string;
    shippingCost?: string;
    status?: "pending" | "delivered";
  }>;
}

export default async function OrdersPage(props: OrdersPageProps) {
  const { searchParams } = props;
  const {
    limit = "10",
    offset = "0",
    q,
    totalRange,
    from,
    to,
    countries,
    shippingCost,
    status,
  } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const query = qs.stringifyUrl({
    url: "",
    query: {
      limit,
      offset,
      q,
      totalRange,
      from,
      to,
      countries,
      shippingCost,
      status,
    },
  });

  const { data, count } = await getOrders(query);
  const { countryGroups, statusGroups, shippingOptionGroups } =
    await aggregateOrders(query);
  return (
    <>
      <div className="container max-w-7xl">
        <div className="mb-4">
          <Breadcrumb links={[{ name: "Orders", href: "#" }]} />
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Orders ({count})
        </h1>
        <div className="mt-6 space-y-3">
          <OrdersTable
            count={count}
            countryGroups={countryGroups}
            orders={data}
            statusGroups={statusGroups}
            shippingOptionGroups={shippingOptionGroups}
          />
        </div>
      </div>
    </>
  );
}
