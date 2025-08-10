"use client";

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
    VisibilityState,
} from "@tanstack/react-table";
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    Check,
    ChevronDown,
    MoreHorizontal,
    PenBox,
    Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";

const data: Payment[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@example.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@example.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@example.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@example.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@example.com",
    },
];

export type Payment = {
    id: string;
    amount: number;
    status: "pending" | "processing" | "success" | "failed";
    email: string;
};

type CustomTableProps = {
    meta: Record<string, any>; // columnName: DisplayName
    data: any[];
    loading?: boolean;
};

function generateColumns(meta: Record<string, any>): ColumnDef<any>[] {
    return Object.keys(meta).map((key) => ({
        id: key,
        accessorKey: key,
        accessorFn: (row) => {
            const value = row[key];
            if (meta[key].fields && typeof value === "object") {
                return meta[key].fields.map((f: string) => value[f]).join(" ");
            }
            return value ?? "";
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    {meta[key].label}
                    {column.getIsSorted() === false ? (
                        <ArrowUpDown />
                    ) : column.getIsSorted() === "asc" ? (
                        <ArrowDown />
                    ) : (
                        <ArrowUp />
                    )}
                </Button>
            );
        },
        cell: ({ row }) => {
            const value = row.original[key];

            if (meta[key].fields && typeof value === "object") {
                return (
                    <div>
                        {meta[key].fields
                            .map((f: string) => value[f])
                            .join(" ")}
                    </div>
                );
            }

            return <div>{String(value ?? "")}</div>;
        },
        // cell: ({ row }) => <div>{row.getValue(key)}</div>,
    }));
}

// function getBaseColumns(): ColumnDef<any>[] {
//     return [
//         {
//             id: "select",
//             header: ({ table }) => (
//                 <div className="relative mt-[5px]">
//                     <input
//                         type="checkbox"
//                         checked={
//                             table.getIsAllPageRowsSelected() ||
//                             table.getIsSomePageRowsSelected()
//                         }
//                         onChange={(e) =>
//                             table.toggleAllPageRowsSelected(!!e.target.checked)
//                         }
//                         className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500"
//                         aria-label="Select all"
//                     />
//                     <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white -translate-y-2/3 opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5" />
//                 </div>
//             ),
//             cell: ({ row }) => (
//                 <div className="relative">
//                     <input
//                         type="checkbox"
//                         checked={row.getIsSelected()}
//                         onChange={(e) => row.toggleSelected(!!e.target.checked)}
//                         className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500"
//                     />
//                     <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white -translate-y-2/3 opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " />
//                 </div>
//             ),
//             enableSorting: false,
//             enableHiding: false,
//         },
//         {
//             id: "actions",
//             enableHiding: false,
//             cell: ({ row }) => (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
//                         <DropdownMenuItem>
//                             <PenBox className="text-blue-600" />
//                             <p>ویرایش</p>
//                         </DropdownMenuItem>
//                         {/* <DropdownMenuSeparator /> */}
//                         <DropdownMenuItem>
//                             <Trash className="text-red-600" />
//                             <p>حذف</p>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             ),
//         },
//     ];
// }

function getColumns(meta: Record<string, any>): ColumnDef<any>[] {
    const checkClaaName =
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white -translate-y-2/3 opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5";
    const inputClassName =
        "peer h-5 w-5 cursor-pointer transition-all bg-white appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500";
    const checkBoxColumn = {
        id: "select",
        header: ({ table }) => (
            <div className="relative mt-[5px]">
                <input
                    type="checkbox"
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        table.getIsSomePageRowsSelected()
                    }
                    onChange={(e) =>
                        table.toggleAllPageRowsSelected(!!e.target.checked)
                    }
                    className={inputClassName}
                    aria-label="Select all"
                />
                <Check className={checkClaaName} />
            </div>
        ),
        cell: ({ row }) => (
            <div className="relative">
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={(e) => row.toggleSelected(!!e.target.checked)}
                    className={inputClassName}
                    aria-label="Select all"
                />
                <Check className={checkClaaName} />
                {/* <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white -translate-y-2/3 opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " /> */}
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    };
    const actionColumn = {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                    <DropdownMenuItem>
                        <PenBox className="text-blue-600" />
                        <p>ویرایش</p>
                    </DropdownMenuItem>
                    {/* <DropdownMenuSeparator /> */}
                    <DropdownMenuItem>
                        <Trash className="text-red-600" />
                        <p>حذف</p>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    };

    return [checkBoxColumn, ...generateColumns(meta), actionColumn];
}

// const x = Object.keys(meta).map((col) => ({
//     accessorKey: col,
//     header: col,
//     cel: ({ row }: { row: any }) => <div>{row.getValue(col)}</div>,
// }));

// export const columns: ColumnDef<>[] = [
//     {
//         id: "select",
//         header: ({ table }) => (
//             <div className="relative mt-[5px]">
//                 <input
//                     type="checkbox"
//                     checked={
//                         table.getIsAllPageRowsSelected() ||
//                         table.getIsSomePageRowsSelected()
//                     }
//                     onChange={(e) =>
//                         table.toggleAllPageRowsSelected(!!e.target.checked)
//                     }
//                     className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500"
//                     aria-label="Select all"
//                 />
//                 <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white -translate-y-2/3 opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5" />
//             </div>
//         ),
//         cell: ({ row }) => (
//             <div className="relative">
//                 <input
//                     type="checkbox"
//                     checked={row.getIsSelected()}
//                     onChange={(e) => row.toggleSelected(!!e.target.checked)}
//                     className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500"
//                 />
//                 <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white -translate-y-2/3 opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " />
//             </div>
//         ),
//         enableSorting: false,
//         enableHiding: false,
//     },
//     {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ row }) => (
//             <div className="capitalize">{row.getValue("status")}</div>
//         ),
//     },
//     // {
//     //     accessorKey: "email",
//     //     header: ({ column }) => {
//     //         return (
//     //             <Button
//     //                 variant="ghost"
//     //                 // className="cursor-pointer"
//     //                 onClick={() =>
//     //                     column.toggleSorting(column.getIsSorted() === "asc")
//     //                 }
//     //             >
//     //                 Email
//     //                 <ArrowUpDown />
//     //             </Button>
//     //         );
//     //     },
//     //     cell: ({ row }) => (
//     //         <div className="lowercase">{row.getValue("email")}</div>
//     //     ),
//     // },
//     // {
//     //     accessorKey: "amount",
//     //     header: ({ column }) => (
//     //         <Button
//     //             variant="ghost"
//     //             // className="cursor-pointer"
//     //             onClick={() =>
//     //                 column.toggleSorting(column.getIsSorted() === "asc")
//     //             }
//     //         >
//     //             Amount
//     //             <ArrowUpDown />
//     //         </Button>
//     //     ),
//     //     cell: ({ row }) => {
//     //         const amount = parseInt(row.getValue("amount"));

//     //         // Format the amount as a dollar amount
//     //         const formatted = new Intl.NumberFormat("fa-IR", {
//     //             style: "currency",
//     //             currency: "IRR",
//     //         }).format(amount);

//     //         return <div className="text-center font-medium">{formatted}</div>;
//     //     },
//     // },
//     {
//         id: "actions",
//         enableHiding: false,
//         cell: ({ row }) => {
//             const payment = row.original;

//             return (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                         {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
//                         <DropdownMenuItem>
//                             <PenBox className="text-blue-600" />
//                             <p>ویرایش</p>
//                         </DropdownMenuItem>
//                         {/* <DropdownMenuSeparator /> */}
//                         <DropdownMenuItem>
//                             <Trash className="text-red-600" />
//                             <p>حذف</p>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>
//             );
//         },
//     },
// ];

export function CustomTable({ meta, data, loading }: CustomTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});

    const columns = getColumns(meta);
    // const columns = useMemo(() => {
    //     return [...getBaseColumns(), ...generateColumns(meta)];
    // }, [meta]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full relative rtl">
            <div className="neu-container">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="font-bold"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
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
                                        // className="h-24 text-center"
                                    >
                                        <NoRecordFound
                                            text="هیچ موردی یافت نشد."
                                            haveBackground={false}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}

// export function CustomTable({ meta, data }: CustomTableProps) {
//     const [sorting, setSorting] = useState<SortingState>([]);
//     const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//     const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
//         {}
//     );
//     const [rowSelection, setRowSelection] = useState({});

//     const table = useReactTable({
//         data,
//         columns,
//         onSortingChange: setSorting,
//         onColumnFiltersChange: setColumnFilters,
//         getCoreRowModel: getCoreRowModel(),
//         getPaginationRowModel: getPaginationRowModel(),
//         getSortedRowModel: getSortedRowModel(),
//         getFilteredRowModel: getFilteredRowModel(),
//         onColumnVisibilityChange: setColumnVisibility,
//         onRowSelectionChange: setRowSelection,
//         state: {
//             sorting,
//             columnFilters,
//             columnVisibility,
//             rowSelection,
//         },
//     });
//     useEffect(() => {
//         console.log("list", list);
//     }, [list]);

//     return (
//         // <div className="w-full relative bg-[#F0EDEF]">
//         <div className="w-full relative rtl">
//             <div className="neu-container">
//                 <Table>
//                     <TableHeader className="">
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <TableRow key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => {
//                                     return (
//                                         <TableHead key={header.id}>
//                                             {header.isPlaceholder
//                                                 ? null
//                                                 : flexRender(
//                                                       header.column.columnDef
//                                                           .header,
//                                                       header.getContext()
//                                                   )}
//                                         </TableHead>
//                                     );
//                                 })}
//                             </TableRow>
//                         ))}
//                     </TableHeader>
//                     <TableBody>
//                         {table.getRowModel().rows?.length ? (
//                             table.getRowModel().rows.map((row) => (
//                                 <TableRow
//                                     key={row.id}
//                                     data-state={
//                                         row.getIsSelected() && "selected"
//                                     }
//                                 >
//                                     {row.getVisibleCells().map((cell) => (
//                                         <TableCell key={cell.id}>
//                                             {flexRender(
//                                                 cell.column.columnDef.cell,
//                                                 cell.getContext()
//                                             )}
//                                         </TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell
//                                     colSpan={columns.length}
//                                     className="h-24 text-center"
//                                 >
//                                     No results.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </div>
//             <div className="flex items-center justify-end space-x-2 py-4 ">
//                 <div className="text-muted-foreground flex-1 text-sm">
//                     {table.getFilteredSelectedRowModel().rows.length} مورد از{" "}
//                     {table.getFilteredRowModel().rows.length} مورد انتخاب شده.
//                 </div>
//             </div>
//         </div>
//     );
// }
