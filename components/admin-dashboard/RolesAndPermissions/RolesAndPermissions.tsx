"use client";
import React, { useCallback } from "react";
import styles from "./RolesAndPermissions.module.css";
import { User, SquareCheckBig, Trash2, Pencil } from "lucide-react";
import { useSelector } from "react-redux";

import * as Yup from "yup";
import { useEffect, useState } from "react";
import EditRoleModal from "./EditRoleModal";
import CreateRoleModal from "./CreateRoleModal";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import Header from "@/components/Header/Header";
import { Badge } from "@/components/ui/badge";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import { deleteData, getData } from "@/src/services/apiHub";
import useHasPermission from "@/src/functions/hasPermission";
import FilterSection from "@/components/FilterSection/FilterSection";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";
import RoleItem from "./RoleItem";

const initialValuesForm = { name: "", permissionIDs: [] };

const validationSchemaForm = Yup.object({
    name: Yup.string().required("نام نقش الزامی است"),
    permissionIDs: Yup.array().of(Yup.number()),
});

type Permission = {
    id: number;
    name: string;
    description: string;
    category: string;
};
type Role = {
    id: string;
    name: string;
    permissions: Permission[];
};

const RolesAndPermissions = () => {
    const hasCreateRolePermission = useHasPermission("user.createRole");
    const [roles, setRoles] = useState<any[]>([]);
    const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [permissionFilter, setPermissionFilter] = useState<string>("");

    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);

    const getRoles = useCallback(() => {
        if (permissionFilter === "all" || permissionFilter === "") {
            setLoading(true);
            getData({
                endPoint: `/v1/admin/roles`,
                params: { pageSize: resultPerPage, page },
            })
                .then((data) => {
                    setRoles(data?.data?.data);
                    setPaginationInfo(data?.data?.pagination);
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        }
    }, [page, resultPerPage, permissionFilter]);

    const getAllPermissions = () => {
        getData({
            endPoint: `/v1/admin/permissions`,
            params: { pageSize: 1000000 },
        })
            .then((data) => {
                // console.log(data?.data?.data);
                setAllPermissions(data?.data?.data);
            })
            .catch((err) => console.log(err));
    };
    const getRolesByPermission = useCallback(
        (permissionId: string) => {
            if (permissionFilter) {
                setLoading(true);
                getData({
                    endPoint: `v1/admin/permissions/${permissionId}/roles`,
                    params: { pageSize: resultPerPage, page },
                })
                    .then((data) => {
                        console.log(data?.data);
                        setRoles(data?.data?.data);
                        setPaginationInfo(data?.data?.pagination);
                    })
                    .catch((err) => console.log(err))
                    .finally(() => setLoading(false));
            }
        },
        [page, resultPerPage, permissionFilter]
    );
    useEffect(() => {
        getAllPermissions();
        getRoles();
    }, [getRoles]);

    useEffect(() => {
        if (permissionFilter !== "" && permissionFilter !== "all") {
            getRolesByPermission(permissionFilter);
        }
    }, [permissionFilter, getRolesByPermission]);
    return (
        <>
            {hasCreateRolePermission && (
                <CreateRoleModal onSaveSuccess={getRoles} />
            )}
            {/* <Header header="نقش‌ها و دسترسی‌ها" /> */}
            <FilterSection
                header="نقش‌ها و دسترسی‌ها"
                resultPerPage={resultPerPage}
                setResultPerPage={setResultPerPage}
            >
                <Select
                    value={permissionFilter}
                    onValueChange={(value) => {
                        console.log(value);
                        setPermissionFilter(value);
                        if (value === "all" || value === "") {
                            getRoles();
                        }
                    }}
                >
                    <SelectTrigger
                        dir="rtl"
                        className={`flex min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]`}
                    >
                        <SelectValue placeholder="فیلتر بر اساس دسترسی" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                        <SelectItem value={"all"} className="cursor-pointer">
                            همه
                        </SelectItem>
                        {allPermissions?.map(
                            (perm: Permission, index: number) => (
                                <SelectItem
                                    key={index}
                                    value={String(perm.id)}
                                    className="cursor-pointer"
                                >
                                    {perm?.description}
                                </SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>
            </FilterSection>
            <div className="flex flex-col relative bg-[#F0EDEF] text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
                {loading ? (
                    <LoadingSpinner />
                ) : roles.length > 0 ? (
                    roles.map((role, index) => (
                        <div
                            key={index}
                            className={`w-full border-t-1 border-gray-300 first:border-t-0`}
                            // className={`bg-white p-4 rounded-xl w-full shadow-sm flex items-center gap-3 rtl ${styles.shadow}`}
                        >
                            <RoleItem
                                role={role}
                                getRoles={getRoles}
                                setLoading={setLoading}
                            />
                            {/* <div
                                key={index}
                                className="flex flex-col rtl justify-between content-center h-full gap-5 py-5 px-5 overflow-hidden relative border-t-1 border-gray-300 w-full first:border-t-0 min-h-[20px]"
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row gap-2">
                                        <div className="text-orange-500">
                                            <User />
                                        </div>
                                        <p className="text-start content-start  text-xl ">
                                            {role?.name}
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <div className="text-orange-500">
                                            <SquareCheckBig />
                                        </div>
                                        <div
                                            className="content-start w-full flex gap-2 text-xl"
                                            dir="rtl"
                                        >
                                            <p>دسترسی‌ها:</p>
                                            {role?.permissions?.length === 0 ? (
                                                <p>دسترسی موجود نیست</p>
                                            ) : (
                                                role?.permissions?.map(
                                                    (
                                                        permission: Permission,
                                                        index: number
                                                    ) =>
                                                        index < 5 && (
                                                            <div
                                                                className="flex flex-row"
                                                                key={index}
                                                            >
                                                                <Badge className="bg-fire-orange">
                                                                    {
                                                                        permission?.description
                                                                    }
                                                                </Badge>
                                                            </div>
                                                        )
                                                )
                                            )}
                                            {role?.permissions?.length >= 5 && (
                                                <Badge className="bg-fire-orange">
                                                    ...
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row w-full h-full px-4 gap-4 rtl justify-end">
                                    <Dialog
                                        key={index}
                                        open={editOpen}
                                        onOpenChange={setEditOpen}
                                    >
                                        <DialogTrigger asChild key={index}>
                                            {editRolePermission && (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        setCurrentRole(role)
                                                    }
                                                    className={`cta-neu-button cursor-pointer w-1/8 flex flex-row ${styles.button} items-center content-center justify-center h-1/2 w-1/2`}
                                                >
                                                    <p>تغییر</p>
                                                    <Pencil className="text-orange-500" />
                                                </button>
                                            )}
                                        </DialogTrigger>
                                        <DialogContent
                                            key={index}
                                            style={{
                                                backgroundColor: "#F1F4FC",
                                            }}
                                            className="w-full sm:min-w-[750px] mx-auto no-scrollbar p-4 overflow-auto pb-0 max-h-[90vh] h-[90vh] overflow-y-auto rtl"
                                        >
                                            <EditRoleModal
                                                editOpen={editOpen}
                                                setEditOpen={setEditOpen}
                                                onClose={() =>
                                                    setIsModalOpen(false)
                                                }
                                                role={currentRole}
                                                onSaveSuccess={getRoles}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                    {removeRolePermission && (
                                        <button
                                            className={`cta-neu-button flex cursor-pointer w-1/8 ${styles.button} items-center content-center justify-center h-1/2 w-1/2 cursor-pointer`}
                                            onClick={() => deleteRole(role?.id)}
                                            key={role?.id}
                                        >
                                            {deletingId === role?.id ? (
                                                <LoadingOnButton />
                                            ) : (
                                                <>
                                                    <p>حذف</p>
                                                    <Trash2 className="text-orange-500" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div> */}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-right">
                        هیچ نقشی موجود نیست.
                    </p>
                )}
            </div>
            <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                paginationInfo={paginationInfo}
            />
        </>
    );
};

export default RolesAndPermissions;
