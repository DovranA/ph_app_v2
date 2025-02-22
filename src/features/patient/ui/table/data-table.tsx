"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import React from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "@/shared/lib";
import useQueryParam from "@/shared/hooks/useQueryParam";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total?: number;
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
  total = 10,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { getQuery, setQuery, deleteQuery } = useQueryParam();

  const paginationHandler = (
    updaterOrValue:
      | { pageIndex: number; pageSize: number }
      | ((old: { pageIndex: number; pageSize: number }) => {
          pageIndex: number;
          pageSize: number;
        })
  ) => {
    const newPagination =
      typeof updaterOrValue === "function"
        ? updaterOrValue({
            pageIndex: Number(getQuery("index") || 0),
            pageSize: Number(getQuery("size") || 10),
          })
        : updaterOrValue;

    if (newPagination.pageIndex !== undefined) {
      setQuery([
        { key: "index", value: newPagination.pageIndex + 1 },
        { key: "size", value: newPagination.pageSize },
      ]);
    } else {
      deleteQuery(["index", "size"]);
    }
  };

  const pagination: PaginationState = {
    pageIndex: Number(getQuery("index") || 0),
    pageSize: Number(getQuery("size") || 10),
  };

  const table = useReactTable({
    manualPagination: true,
    pageCount: Math.floor(total / 10) + 1,
    rowCount: total || 0,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: paginationHandler,
    onRowSelectionChange: setRowSelection,
    state: {
      pagination,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const debouncedSearch = React.useMemo(
    () =>
      debounce((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
          params.set("s", term);
        } else {
          params.delete("s");
        }
        router.replace(`${pathname}?${params.toString()}`);
      }, 300),
    [searchParams, pathname, router]
  );

  const handleSearch = React.useCallback(
    (term: string) => debouncedSearch(term),
    [debouncedSearch]
  );

  const handlePagePrev = () => {
    if (getQuery("index") == "2") {
      deleteQuery(["index", "size"]);
    } else {
      table.previousPage();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Gözleg..."
          onChange={(event) => handleSearch(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto bg-blue-500 text-white hover:bg-blue-500/80 hover:text-white"
            >
              Sütün <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-blue-100"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      onClick={() =>
                        !cell.id.includes("select") &&
                        !cell.id.includes("actions") &&
                        router.push(`${pathname}${cell.row.original.id}`)
                      }
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getRowCount()} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagePrev()}
            disabled={!table.getCanPreviousPage()}
            className="bg-white border-blue-500 hover:text-white text-blue-500 font-semibold hover:bg-blue-500"
          >
            Öňki sahypa
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-white border-blue-500 hover:text-white text-blue-500 font-semibold hover:bg-blue-500"
          >
            Indiki sahypa
          </Button>
        </div>
      </div>
    </div>
  );
}
