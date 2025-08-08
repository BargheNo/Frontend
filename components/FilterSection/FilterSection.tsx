"use client";
import React, { useEffect, useState } from "react";
const initialValues = {
    search: "",
    resultPerPage: "10",
    sorting: "most-recent",
};

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Search } from "lucide-react";
import CustomInput from "../Custom/CustomInput/CustomInput";
import Header from "../Header/Header";
import { getData } from "@/src/services/apiHub";
import CustomInputNoValidation from "../Custom/CustomInput/CustomInputNoValidation";
import FilterSelect from "./FilterSelect";

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
    column,
    setColumn,
    resultPerPage,
    setResultPerPage,
    searchPhrase,
    setSearchPhrase,
    onSearchSubmit,
    resultPerPages,
    setPage
}: {
    fieldName?: string;
    header?: string;
    statusesListApiRoute?: string;
    columnsListApiRoute?: string;
    status?: string;
    setStatus?: React.Dispatch<React.SetStateAction<string>>;
    column?: string;
    setColumn?: React.Dispatch<React.SetStateAction<string>>;
    resultPerPage?: string;
    setResultPerPage?: React.Dispatch<React.SetStateAction<string>>;
    searchPhrase?: string;
    setSearchPhrase?: React.Dispatch<React.SetStateAction<string>>;
    onSearchSubmit?: any;
    resultPerPages?: Item[];
    setPage?: React.Dispatch<React.SetStateAction<number>>;
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
                {setStatus && (
                    <FilterSelect
                        placeholder={`وضعیت ${fieldName ?? fieldName}`}
                        field={status}
                        setField={setStatus}
                        possibleValues={statuses}
                        loading={initialLoading}
                    />
                    // <Select
                    // 	value={String(status)}
                    // 	onValueChange={(value) => setStatus(value)}
                    // >
                    // 	<SelectTrigger
                    // 		dir="rtl"
                    // 		className="flex min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
                    // 	>
                    // 		<SelectValue
                    // 			placeholder={`وضعیت ${
                    // 				fieldName ? fieldName : ""
                    // 			}`}
                    // 		/>
                    // 	</SelectTrigger>
                    // 	<SelectContent dir="rtl">
                    // 		{statuses?.map((status: status, index: number) => (
                    // 			<SelectItem
                    // 				key={index}
                    // 				value={String(status.id)}
                    // 				className="cursor-pointer"
                    // 			>
                    // 				{status.name}
                    // 			</SelectItem>
                    // 		))}
                    // 	</SelectContent>
                    // </Select>
                )}
                {setColumn && (
                    <FilterSelect
                        placeholder="مرتب سازی بر اساس"
                        field={column}
                        setField={setColumn}
                        possibleValues={columns}
                        loading={initialLoading}
                    />
                    // <Select
                    // 	value={String(column)}
                    // 	onValueChange={(value) => setColumn(value)}
                    // >
                    // 	<SelectTrigger
                    // 		dir="rtl"
                    // 		className="flex min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
                    // 	>
                    // 		<SelectValue placeholder="مرتب سازی بر اساس" />
                    // 	</SelectTrigger>
                    // 	<SelectContent dir="rtl">
                    // 		{columns?.map((column: status, index: number) => (
                    // 			<SelectItem
                    // 				key={index}
                    // 				value={String(column.id)}
                    // 				className="cursor-pointer"
                    // 			>
                    // 				{column.name}
                    // 			</SelectItem>
                    // 		))}
                    // 	</SelectContent>
                    // </Select>
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
