import { PriceInput } from "@/features/common/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/features/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/features/ui/form";
import { Input } from "@/features/ui/input";
import { Textarea } from "@/features/ui/textarea";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { slugify } from "../../common/utils";
import { ProductFormDto } from "../types";

interface ProductOverviewProps {
  form: UseFormReturn<ProductFormDto, any, undefined>;
  loading: boolean;
}

export const ProductOverview: React.FC<ProductOverviewProps> = ({
  form,
  loading,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
        <CardDescription>
          Enter the main details customers will see when viewing this product.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="text"
                    className="w-full"
                    placeholder="Product name"
                    {...field}
                    onBlur={() => {
                      field.onBlur();
                      form.setValue("slug", slugify(field.value));
                    }}
                  />
                </FormControl>
                <FormDescription>Blur to auto-fill the slug</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="desc" className="block">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    id="desc"
                    rows={6}
                    disabled={loading}
                    placeholder="Add a description here..."
                    {...field}
                    className="min-h-32 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="block">Pricing</FormLabel>
                  <FormControl>
                    <PriceInput
                      disabled={loading}
                      className="w-full"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="block">In stock</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      className="w-full"
                      type="number"
                      placeholder="4"
                      min={0}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
