"use client";

import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Patient } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { format } from "date-fns/format";
import PatientDelete from "../patient-delete";
import { Dialog, DialogTrigger } from "@/shared/ui/dialog";
import PrintDialog from "./print-dialog";
import { CreatePatentForm } from "../../container/create-patent-dialog";

export const columns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className=" z-50"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FAA
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.firstName + " " + row.original.secondName}
      </div>
    ),
  },
  {
    accessorKey: "enterAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Giren wagty
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {format(row.original.birthday, "dd.MM.yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "gender",
    header: "Jynsy",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("gender") == "M" ? "erkek" : "zenan"}
      </div>
    ),
  },
  {
    accessorKey: "section",
    header: "Bölüm",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("section")}</div>
    ),
  },
  {
    accessorKey: "nationality",
    header: "Milleti",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("nationality")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const pateint = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hereketler</DropdownMenuLabel>
            <DropdownMenuItem className="w-full">
              <PatientDelete id={row.original.id} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    Çap etmek
                  </Button>
                </DialogTrigger>
                <PrintDialog id={row.original.id} />
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <CreatePatentForm
                actions={
                  <Button type="submit" className="w-full" variant="outline">
                    Näsag üýtgetmek
                  </Button>
                }
                patientId={row.original.id}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
