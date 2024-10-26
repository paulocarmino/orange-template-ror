import { Link, Head } from "@inertiajs/react";

import { Button } from "@src/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadcrumb";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as routes from "@src/routes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/table";
import { useState } from "react";
import { Input } from "@ui/input";
import { DataTableColumnHeader } from "@ui/column-header";
import { DataTablePagination } from "@ui/pagination";
import { DataTableViewOptions } from "@ui/column-toggle";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return row.original.name?.toString();
    },
  },
  {
    accessorKey: "script",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Script" />
    ),
    cell: ({ row }) => {
      return row.original.script?.toString();
    },
  },
  {
    accessorKey: "check_frequency",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check frequency" />
    ),
    cell: ({ row }) => {
      return row.original.check_frequency?.toString();
    },
  },
  {
    accessorKey: "failure_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Failure count" />
    ),
    cell: ({ row }) => {
      return row.original.failure_count?.toString();
    },
  },
  {
    accessorKey: "last_checked_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last checked at" />
    ),
    cell: ({ row }) => {
      return row.original.last_checked_at?.toString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Link href={routes.monitor_check(row.original.id)}>
            <Button variant={"outline"} size="sm">
              View
            </Button>
          </Link>
          <Link href={routes.edit_monitor_check(row.original.id)}>
            <Button variant={"outline"} size="sm">
              Edit
            </Button>
          </Link>
        </div>
      );
    },
  },
];

const DataTable = ({ data, columns }: any) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center">
      <div className="flex items-center py-4 w-full">
        <Input
          placeholder={`Filter by name...`}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
      </div>
      <DataTableViewOptions table={table} />
      </div>

      <div className="mb-4 rounded-md border">
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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

      <DataTablePagination table={table} />
    </div>
  );
};

export default function Index({ monitor_checks }: any) {
  return (
    <>
      <header className="flex gap-2 items-center pt-8 shrink-0">
        <div className="flex gap-2 items-center">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link href={routes.root()}>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Monitor checks</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <Head title="Monitor checks" />
      <div className="mx-auto mt-2 w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Monitor checks</h1>
          <Button asChild>
            <Link href={routes.new_monitor_check()}>New monitor check</Link>
          </Button>
        </div>

        <div className="mt-4 min-w-full">
          <DataTable columns={columns} data={monitor_checks} />
        </div>
      </div>
    </>
  );
}

