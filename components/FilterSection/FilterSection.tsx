"use client";
import React, { useEffect, useState } from "react";

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

export interface Item {
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
    query,
    setQuery,
    onSearchSubmit,
    resultPerPages,
    setPage,
    asc,
    setAsc,
    statusesList,
    initialLoadingDefault = true,
    children,
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
    query?: string;
    setQuery?: React.Dispatch<React.SetStateAction<string>>;
    onSearchSubmit?: any;
    resultPerPages?: Item[];
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    asc?: boolean;
    setAsc?: React.Dispatch<React.SetStateAction<boolean>>;
    statusesList?: Item[];
    initialLoadingDefault?: boolean;
    children?: any;
}) {
    const [initialLoading, setInitialLoading] = useState<boolean>(
        initialLoadingDefault
    );
    const [statuses, setStatuses] = useState<Item[] | undefined>(
        statusesList ?? undefined
    );
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
                    // console.log(res?.data);
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
        <div className="flex flex-col sm:flex-row place-items-center justify-between sm:w-full w-full gap-4">
            <div
                className={`flex min-w-fit ${
                    setQuery && "text-start place-self-center sm:place-self-end"
                }`}
            >
                {header && <Header header={header} />}
            </div>

            <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 w-full place-items-center relative ltr">
                {setSortBy && (
                    <div className="flex sm:gap-4 gap-2 w-full sm:w-fit place-items-center justify-start">
                        {setAsc &&
                            (initialLoading ? (
                                <Skeleton className={`h-[36px] w-[68px]`} />
                            ) : (
                                <div
                                    className="border-input py-[5.5px] relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground cursor-pointer aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8"
                                    onClick={() => setAsc && setAsc(!asc)}
                                >
                                    {asc ? (
                                        <ArrowUpWideNarrow className="text-[#FA682D]" />
                                    ) : (
                                        <ArrowDownWideNarrow className="text-[#FA682D]" />
                                    )}
                                </div>
                            ))}
                        <FilterSelect
                            placeholder="مرتب سازی بر اساس"
                            field={sortBy}
                            setField={setSortBy}
                            possibleValues={columns}
                            loading={initialLoading}
                            onValueChange={() => setPage && setPage(1)}
                        />
                    </div>
                )}

                {setResultPerPage && (
                    <div className="w-full sm:w-40 flex justify-start">
                        <FilterSelect
                            placeholder="نتایج هر صفحه"
                            field={resultPerPage}
                            setField={setResultPerPage}
                            possibleValues={initalResultPerPages}
                            loading={initialLoading}
                            onValueChange={() => setPage && setPage(1)}
                        />
                    </div>
                )}
                {setStatus && (
                    <div className="w-full sm:w-40 flex justify-start">
                        <FilterSelect
                            placeholder={`وضعیت ${fieldName ? fieldName : ""}`}
                            field={status}
                            setField={setStatus}
                            possibleValues={statuses}
                            loading={initialLoading}
                            onValueChange={() => setPage && setPage(1)}
                        />
                    </div>
                )}
                {children &&
                    (initialLoading ? (
                        <Skeleton className={`h-9 w-full sm:max-w-40`} />
                    ) : (
                        children
                    ))}
                {setQuery &&
                    (initialLoading ? (
                        <Skeleton className={`h-[36px] w-full`} />
                    ) : (
                        <CustomInputNoValidation
                            icon={Search}
                            placeholder="جستجو..."
                            value={query}
                            onSubmit={onSearchSubmit}
                            onValueChange={(e) => {
                                setQuery(e);
                                if (setPage) {
                                    setPage(1);
                                }
                            }}
                            // containerClassName="h-9"
                            inputClassName="h-[36px]"
                        />
                    ))}
            </div>
        </div>
    );
}
