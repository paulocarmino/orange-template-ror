import { Link, Head } from "@inertiajs/react";

import { Button } from "@src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";
import New from "./new";
import Edit from "./edit";
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
import { SiteHeader } from "@/frontend/src/components/common/site-header";
import { PlusIcon } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return row.original.title?.toString();
    },
  },
  {
    accessorKey: "body",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Body" />
    ),
    cell: ({ row }) => {
      return row.original.body?.toString();
    },
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" />
    ),
    cell: ({ row }) => {
      return row.original.author?.toString();
    },
  },
  {
    accessorKey: "published_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published at" />
    ),
    cell: ({ row }) => {
      return row.original.published_at?.toString();
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return row.original.status?.toString();
    },
  },
  {
    accessorKey: "featured",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Featured" />
    ),
    cell: ({ row }) => {
      return row.original.featured?.toString();
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const onEdit = (table.options.meta as any)?.onEdit;
      return (
        <div className="flex gap-2">
          <Link href={routes.article(row.original.id)}>
            <Button variant={"outline"} size="sm">
              View
            </Button>
          </Link>
          <Button
            variant={"outline"}
            size="sm"
            onClick={() => onEdit?.(row.original)}
          >
            Edit
          </Button>
        </div>
      );
    },
  },
];

interface DataTableProps {
  data: any[];
  columns: ColumnDef<any>[];
  onNewArticle: () => void;
  onEditArticle: (article: any) => void;
}

const DataTable = ({ data, columns, onNewArticle, onEditArticle }: DataTableProps) => {
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
    meta: {
      onEdit: onEditArticle,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full pb-4">
          <Input
            placeholder={`Filter by title...`}
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
        </div>

        <div className="flex justify-center gap-2">
          <DataTableViewOptions table={table} />
          <Button size="sm" onClick={onNewArticle}>
            <PlusIcon />
            New article
          </Button>
        </div>
      </div>

      <div className="mb-4 border rounded-md">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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

      <DataTablePagination table={table} />
    </div>
  );
};

export default function Index({ articles }: any) {
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // AIDEV-NOTE: Empty article object for creating new articles
  const emptyArticle = {
    title: "",
    body: "",
    author: "",
    published_at: "",
    status: "",
    featured: false,
  };

  const handleEdit = (article: any) => {
    setEditingArticle(article);
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <Head title="Articles" />
      <SiteHeader title="Articles" />

      <div className="w-full px-4 lg:px-6">
        <DataTable
          columns={columns}
          data={articles}
          onNewArticle={() => setIsNewDialogOpen(true)}
          onEditArticle={handleEdit}
        />
      </div>

      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Article</DialogTitle>
          </DialogHeader>
          <New
            article={emptyArticle}
            isModal={true}
            onSuccess={() => setIsNewDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          {editingArticle && (
            <Edit
              article={editingArticle}
              isModal={true}
              onSuccess={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
