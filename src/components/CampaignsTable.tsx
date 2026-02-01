"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";

import type { Campaign } from "@/lib/mockData";
import { formatINR, formatPct } from "@/lib/mockData";

const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: "Campaign",
    cell: ({ row }) => (
      <Link
        className="font-medium underline"
        href={`/campaigns/${row.original.id}`}
      >
        {row.original.name}
      </Link>
    ),
  },
  { accessorKey: "platform",
    header: "Platform" },
  {
    accessorKey: "spend",
    header: "Spend",
    cell: ({ getValue }) => formatINR(getValue<number>()),
  },
  {
    accessorKey: "ctr",
    header: "CTR",
    cell: ({ getValue }) => formatPct(getValue<number>()),
  },
  {
    accessorKey: "cpc",
    header: "CPC",
    cell: ({ getValue }) => formatINR(getValue<number>()),
  },
  { accessorKey: "conversions", header: "Conv." },
  { accessorKey: "healthScore", header: "Health" },
  { accessorKey: "topIssue", header: "Top issue" },
];

export default function CampaignsTable({ campaigns }: { campaigns: Campaign[] }) {
  const table = useReactTable({
    data: campaigns,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto">
      <table className="w-full min-w-[900px] border-separate border-spacing-0">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-left text-xs text-zinc-500">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border-b border-zinc-200 px-3 py-2"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="text-sm">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-zinc-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-b border-zinc-100 px-3 py-2"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
