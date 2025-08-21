"use client";
import { Button } from "@/features/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/ui/dialog";
import { Form } from "@/features/ui/form";
import { Loader2 } from "lucide-react";
import { CategoryFormFields, CategoryParents } from "../form";
import { Category } from "../types";
import { useCreateCategory } from "./use-create-category";
import { useCreateCategoryModal } from "./use-modal";

interface CreateCategoryModalProps {
  parents: Category | null;
}

export function CreateCategoryModal({
  parents,
}: CreateCategoryModalProps) {
  const { isOpen, onClose } = useCreateCategoryModal();
  const { loading, handleSubmit, form } = useCreateCategory(parents?.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            Create new category for better products filtering
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <CategoryFormFields form={form} loading={loading} />
            <CategoryParents parents={parents} />

            <DialogFooter>
              <div className="flex items-center gap-x-4">
                <Button
                  onClick={onClose}
                  disabled={loading}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button disabled={loading} type="submit">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
