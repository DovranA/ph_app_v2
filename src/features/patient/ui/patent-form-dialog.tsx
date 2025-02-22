import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

import React from "react";

export function PatientFormDialog({
  actions,
  description,
  fields,
  title,
  error,
  action,
}: {
  title: string;
  description: string;
  fields: React.ReactNode;
  actions: React.ReactNode;
  error: React.ReactNode;
  action: (formData: FormData) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-500/80 font-semibold">
          Näsag döretmek
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4 ">
          {fields}
          {error}
          {actions}
        </form>
      </DialogContent>
    </Dialog>
  );
}
