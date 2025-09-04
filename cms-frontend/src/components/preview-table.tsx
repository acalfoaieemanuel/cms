"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ContentDto, LangCode } from "@/models/content";
import { contentApi } from "@/services/contentApi";

const LANGUAGES: { label: string; value: LangCode }[] = [
  { label: "English", value: "en" },
  { label: "Danish", value: "da" },
  { label: "Swedish", value: "sv" },
];

export const columns: ColumnDef<ContentDto>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "language", header: "Language" },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <img
        src={row.getValue("image")}
        alt="content image"
        className="h-10 w-10 object-cover rounded"
      />
    ),
  },
  { accessorKey: "text", header: "Text" },
  {
    accessorKey: "textAlignment",
    header: "Alignment",
    cell: ({ row }) => <div className="capitalize">{row.getValue("textAlignment")}</div>,
  },
];

export function ContentTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  // Fetch data
  const { data, isLoading, error } = useQuery<ContentDto[], Error>({
    queryKey: ["contents"],
    queryFn: contentApi.getAll,
  });

  const table = useReactTable({
    data: data ?? [],
    columns,
    state: { sorting, columnFilters, columnVisibility },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="w-full space-y-4">
      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Filter by text..."
          value={(table.getColumn("text")?.getFilterValue() as string) ?? ""}
          onChange={(e) => table.getColumn("text")?.setFilterValue(e.target.value)}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Language</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.value}
                onClick={() => table.getColumn("language")?.setFilterValue(lang.value)}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => table.getColumn("language")?.setFilterValue("")}>
              Clear
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table.getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuItem key={col.id} className="capitalize">
                  <input
                    type="checkbox"
                    checked={col.getIsVisible()}
                    onChange={() => col.toggleVisibility(!col.getIsVisible())}
                  />{" "}
                  {col.id}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
