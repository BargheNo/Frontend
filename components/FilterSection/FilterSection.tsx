"use client";
import React, { useEffect, useState } from "react";
const initialValues = {
    search: "",
    resultPerPage: "10",
    sorting: "most-recent",
};

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ArrowDownWideNarrow, ArrowUpWideNarrow, Search } from "lucide-react";
import CustomInput from "../Custom/CustomInput/CustomInput";
import Header from "../Header/Header";
import { getData } from "@/src/services/apiHub";
import CustomInputNoValidation from "../Custom/CustomInput/CustomInputNoValidation";
import FilterSelect from "./FilterSelect";
import { Skeleton } from "../ui/skeleton";
import { sortBy } from "cypress/types/lodash";

interface Item {
    id: number;
    name: string;
}

export default function FilterSection({
    fieldName,
    header,
    statusesListApiRoute,
    columnsListApiRoute,
    status,
    setStatus,
    sortBy,
    setSortBy,
    resultPerPage,
    setResultPerPage,
    searchPhrase,
    setSearchPhrase,
    onSearchSubmit,
    resultPerPages,
    setPage,
    asc,
    setAsc,
}: {
    fieldName?: string;
    header?: string;
    statusesListApiRoute?: string;
    columnsListApiRoute?: string;
    status?: string;
    setStatus?: React.Dispatch<React.SetStateAction<string>>;
    sortBy?: string;
    setSortBy?: React.Dispatch<React.SetStateAction<string>>;
    resultPerPage?: string;
    setResultPerPage?: React.Dispatch<React.SetStateAction<string>>;
    searchPhrase?: string;
    setSearchPhrase?: React.Dispatch<React.SetStateAction<string>>;
    onSearchSubmit?: any;
    resultPerPages?: Item[];
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    asc?: boolean;
    setAsc?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [initialLoading, setInitialLoading] = useState<boolean>(true);
    const [statuses, setStatuses] = useState<Item[] | undefined>(undefined);
    const [columns, setColumns] = useState<Item[] | undefined>(undefined);
    const initalResultPerPages: Item[] = resultPerPages ?? [
        { id: 5, name: "5" },
        { id: 10, name: "10" },
        { id: 20, name: "20" },
        { id: 50, name: "50" },
        { id: 100, name: "100" },
    ];

    // fetch all statuses and columns for sorting
    useEffect(() => {
        if (statusesListApiRoute) {
            getData({ endPoint: statusesListApiRoute })
                .then((res) => {
                    setStatuses(res?.data);
                    console.log(res?.data);
                    if (columnsListApiRoute) {
                        getData({ endPoint: columnsListApiRoute })
                            .then((res2) => {
                                setColumns(res2?.data);
                            })
                            .catch((err2) => console.log(err2))
                            .finally(
                                () =>
                                    setInitialLoading &&
                                    setInitialLoading(false)
                            );
                    }
                })
                .catch((err) => console.log(err))
                .finally(
                    () =>
                        !columnsListApiRoute &&
                        setInitialLoading &&
                        setInitialLoading(false)
                );
        } else if (columnsListApiRoute) {
            getData({ endPoint: columnsListApiRoute })
                .then((res2) => {
                    setColumns(res2?.data);
                })
                .catch((err2) => console.log(err2))
                .finally(() => setInitialLoading && setInitialLoading(false));
        } else if (setInitialLoading) {
            setInitialLoading(false);
        }
    }, [statusesListApiRoute, columnsListApiRoute, setInitialLoading]);
    return (
        <div className="flex place-items-center justify-between w-full gap-4">
            <div
                className={`flex min-w-fit ${
                    setSearchPhrase && "place-self-end"
                }`}
            >
                {header && <Header header={header} />}
            </div>
            <div className="flex gap-4 w-full place-items-center ltr">
                {initialLoading ? (
                    <Skeleton className={`h-[40px] w-[50px]`} />
                ) : (
                    setAsc && (
                        <div
                            className="border-input py-[5.5px] relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground cursor-pointer aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 rtl:flex-row-reverse"
                            onClick={() => setAsc && setAsc(!asc)}
                        >
                            {asc ? (
                                <ArrowUpWideNarrow className="text-[#FA682D]" />
                            ) : (
                                <ArrowDownWideNarrow className="text-[#FA682D]" />
                            )}
                        </div>
                    )
                )}
                {setSortBy && (
                    <FilterSelect
                        placeholder="مرتب سازی بر اساس"
                        field={sortBy}
                        setField={setSortBy}
                        possibleValues={columns}
                        loading={initialLoading}
                    />
                )}
                {setStatus && (
                    <FilterSelect
                        placeholder={`وضعیت ${fieldName ?? fieldName}`}
                        field={status}
                        setField={setStatus}
                        possibleValues={statuses}
                        loading={initialLoading}
                    />
                )}
                {setResultPerPage && (
                    <FilterSelect
                        placeholder="نتایج هر صفحه"
                        field={resultPerPage}
                        setField={setResultPerPage}
                        possibleValues={initalResultPerPages}
                        loading={initialLoading}
                        onValueChange={() => setPage && setPage(1)}
                    />
                    // <Select
                    // 	value={resultPerPage}
                    // 	onValueChange={(value) => setResultPerPage(value)}
                    // >
                    // 	<SelectTrigger
                    // 		dir="rtl"
                    // 		className="flex min-w-36 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
                    // 	>
                    // 		<SelectValue placeholder="نتایج هر صفحه" />
                    // 	</SelectTrigger>
                    // 	<SelectContent dir="rtl">
                    // 		{resultPerPages?.map(
                    // 			(resultPerPage: string, index: number) => (
                    // 				<SelectItem
                    // 					key={index}
                    // 					value={resultPerPage}
                    // 					className="cursor-pointer"
                    // 				>
                    // 					{resultPerPage}
                    // 				</SelectItem>
                    // 			)
                    // 		)}
                    // 	</SelectContent>
                    // </Select>
                )}
                {setSearchPhrase && !initialLoading && (
                    <CustomInputNoValidation
                        icon={Search}
                        placeholder="جستجو..."
                        value={searchPhrase}
                        onSubmit={onSearchSubmit}
                        // onValueChange={setSearchPhrase}
                    />
                )}
            </div>
        </div>
    );
}
