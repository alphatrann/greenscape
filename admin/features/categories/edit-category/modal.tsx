"use client";
import { Button } from "@/features/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/features/ui/dialog";
import { Form } from "@/features/ui/form";
import { Loader2 } from "lucide-react";
import { CategoryFormFields, CategoryParents } from "../form";
import { Category } from "../types";
import { useEditCategory } from "./use-edit-category";
import { useEditCategoryModal } from "./use-modal";

interface EditCategoryModalProps {
  parents: Category | null;
}

export function EditCategoryModal({ parents }: EditCategoryModalProps) {
  const { isOpen, onClose, currentCategory } = useEditCategoryModal();
  const { loading, handleSubmit, form } = useEditCategory(currentCategory);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
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
                  Edit
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
