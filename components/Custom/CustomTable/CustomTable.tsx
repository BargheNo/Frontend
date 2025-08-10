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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useCallback, useEffect, useMemo, useState } from "react";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { deleteData } from "@/src/services/apiHub";
import CustomToast from "../CustomToast/CustomToast";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import SubmitButton from "@/components/Dialog/SubmitButton/SubmitButton";

type CustomTableProps = {
    meta: Record<string, any>; // columnName: DisplayName
    data: any[];
    loading?: boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    resultPerPage: string;
    deleteApiUrl: string; // API URL pattern like '/v1/admin/installation/request/:id'
    updateApiUrl: string; // API URL pattern like '/v1/admin/installation/request/:id'
    onDeleteSuccess?: (deletedId: string | number) => void; // Callback after successful deletion
    onDeleteError?: (error: any) => void; // Callback on deletion error
    fetchData: () => void;
};

function generateColumns(meta: Record<string, any>): ColumnDef<any>[] {
    return Object.keys(meta).map((key) => ({
        id: key,
        accessorKey: key, // Use accessorKey instead of accessorFn for better sorting
        accessorFn: (row) => {
            const value = row[key];
            if (
                meta[key].fields &&
                typeof value === "object" &&
                value !== null
            ) {
                const joinedValue = meta[key].fields
                    .map((f: string) => value[f] || "")
                    .join(" ");
                return joinedValue;
            }
            // Return the raw value for proper sorting
            return value ?? "";
        },
        sortingFn: (rowA, rowB, columnId) => {
            const aValue = rowA.getValue(columnId);
            const bValue = rowB.getValue(columnId);

            // Handle null/undefined values
            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return 1;
            if (bValue == null) return -1;

            // Convert to string for comparison if needed
            const aStr = String(aValue).toLowerCase();
            const bStr = String(bValue).toLowerCase();

            // Try numeric comparison first
            const aNum = Number(aValue);
            const bNum = Number(bValue);
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return aNum - bNum;
            }

            // Fallback to string comparison
            return aStr.localeCompare(bStr);
        },
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => {
                    column.toggleSorting(column.getIsSorted() === "asc");
                }}
                className="h-auto p-2"
            >
                {meta[key].label}
                {column.getIsSorted() === false ? (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => {
            const value = row.original[key];
            if (
                meta[key].fields &&
                typeof value === "object" &&
                value !== null
            ) {
                return (
                    <div>
                        {meta[key].fields
                            .map((f: string) => value[f] || "")
                            .join(" ")}
                    </div>
                );
            }
            return <div>{String(value ?? "")}</div>;
        },
        enableSorting: true, // Explicitly enable sorting
    }));
}

function getColumns(
    meta: Record<string, any>,
    onDelete: (id: number, deleteApiUrl?: string) => void
): ColumnDef<any>[] {
    const checkClaaName =
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white -translate-y-2/3 opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5";
    const inputClassName =
        "peer h-5 w-5 cursor-pointer transition-all bg-white appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500";

    const checkBoxColumn: ColumnDef<any> = {
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
                    aria-label="Select row"
                />
                <Check className={checkClaaName} />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    };

    const actionColumn: ColumnDef<any> = {
        id: "actions",
        enableHiding: false,
        enableSorting: false,
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <AlertDialog>
                    <DropdownMenuContent align="left">
                        <DropdownMenuItem>
                            <PenBox className="text-blue-600 mr-2 h-4 w-4" />
                            <p>ویرایش</p>
                        </DropdownMenuItem>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                variant="destructive"
                                // onClick={() => onDelete(row?.original?.id)}
                            >
                                <Trash className="mr-2 h-4 w-4" />
                                <p>حذف</p>
                            </DropdownMenuItem>
                        </AlertDialogTrigger>
                    </DropdownMenuContent>
                    <AlertDialogContent className="rtl">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                آیا از حذف این مورد اطمینان کامل دارید؟
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                این عمل غیرقابل بازگشت است. این اطلاعات نیز برای
                                همیشه حذف خواهند شد.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="cursor-pointer ">بازگشت</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => onDelete(row?.original?.id)}
                                className="cursor-pointer bg-gradient-to-br from-[#EE4334] to-[#D73628] hover:from-[#D73628] hover:to-[#EE4334] active:from-[#EE4334] active:to-[#D73628]"
                            >
                                بله، اطمینان کامل دارم
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenu>
        ),
    };

    return [checkBoxColumn, ...generateColumns(meta), actionColumn];
}

export function CustomTable({
    meta,
    data,
    loading,
    page,
    setPage,
    resultPerPage,
    deleteApiUrl,
    updateApiUrl,
    fetchData,
}: CustomTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [rowSelection, setRowSelection] = useState({});
    const deleteRecord = useCallback(
        (id: number, deleteApiUrl: string) => {
            const endPoint = deleteApiUrl.replace(":id", String(id));
            console.log("endPoint", endPoint, String(id), id);
            deleteData({ endPoint: endPoint })
                .then((data) => {
                    CustomToast(data?.message, "success");
                    fetchData();
                })
                .catch((err) => console.log(err));
        },
        [fetchData]
    );
    const columns = useMemo(
        () => getColumns(meta, (id) => deleteRecord(id, deleteApiUrl)),
        [meta, deleteApiUrl, deleteRecord]
    );

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), // This is crucial for sorting
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(), // Add this back
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        // Configure pagination
        initialState: {
            pagination: {
                pageSize: Number(resultPerPage),
                pageIndex: page - 1,
            },
        },
    });

    // Update pagination when props change
    useEffect(() => {
        table.setPageSize(Number(resultPerPage));
        table.setPageIndex(page - 1);
    }, [page, resultPerPage, table]);

    // Reset to first page when sorting changes
    useEffect(() => {
        if (sorting.length > 0) {
            setPage(1);
        }
    }, [sorting, setPage]);

    // Reset to first page when sorting changes
    useEffect(() => {
        if (sorting.length > 0) {
            table.setPageIndex(0);
        }
    }, [sorting, table]);

    // Use React Table's built-in pagination instead of manual slicing
    const currentRows = table.getRowModel().rows;

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
                            {currentRows.length ? (
                                currentRows.map((row) => (
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
                                    <TableCell colSpan={columns.length}>
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
