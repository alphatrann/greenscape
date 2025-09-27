"use client";
import { Category } from "@/features/categories/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/features/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/features/ui/button";

interface DesktopLinksProps {
  categories: Category[];
}

export const DesktopLinks = ({ categories }: DesktopLinksProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categories.map((c) => (
          <NavigationMenuItem key={c.id} className="md:block hidden">
            <NavigationMenuTrigger>{c.name}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-[600px] gap-8 justify-between p-8 flex">
                {c.subCategories.map((sc) => (
                  <li key={sc.id} className="h-fit">
                    <span className="block text-sm font-medium leading-none">
                      {sc.name}
                    </span>
                    <div className="mt-3 grid gap-2">
                      {sc.subCategories.map((ssc) => (
                        <Button
                          variant="link"
                          asChild
                          className="mt-1 p-0 font-normal h-fit justify-start leading-snug text-muted-foreground"
                          key={ssc.id}
                        >
                          <Link
                            href={`/products/category/${c.slug}/${sc.slug}/${ssc.slug}`}
                          >
                            {ssc.name}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
