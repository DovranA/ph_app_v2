import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

import React from "react";
import { Inputs } from "../actions/create-patient";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
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
  action: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{actions}</DialogTrigger>
      <DialogContent className="w-full max-w-3xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={action} className="space-y-4 ">
          {fields}
          {error}
          {actions}
        </form>
      </DialogContent>
    </Dialog>
  );
}
