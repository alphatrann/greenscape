import { Category } from "@/features/categories/types";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/features/ui/sheet";
import { Button } from "../../ui/button";
import { Menu } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import Link from "next/link";

interface MobileLinksProps {
  categories: Category[];
}

export const MobileLinks = ({ categories }: MobileLinksProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" size="icon" variant="ghost">
          <Menu className="w-5 h-5 text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs overflow-auto">
        <SheetHeader>
          <Tabs defaultValue="plants" className="w-[250px] mt-4">
            <TabsList className="grid w-full grid-cols-2">
              {categories.map((c) => (
                <TabsTrigger value={c.slug} key={c.id}>
                  {c.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((c) => (
              <TabsContent value={c.slug} key={c.id}>
                <ul className="space-y-8 mt-8 text-start">
                  {c.subCategories.map((sc) => (
                    <li key={c.id}>
                      <span className="block font-medium leading-none">
                        {sc.name}
                      </span>
                      <div className="mt-3 grid gap-2">
                        {sc.subCategories.map((ssc) => (
                          <Link
                            href={`/products/category/${c.slug}`}
                            key={ssc.id}
                            className="mt-1 block leading-snug text-muted-foreground"
                          >
                            {ssc.name}
                          </Link>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}
          </Tabs>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
