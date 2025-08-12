"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Phone, Settings, User, CircleX, Loader2, Check } from "lucide-react";
import styles from "./Users.module.css";
import UserRolesModal from "./UserRoleModal";
import FilterUsers from "./FilterUsers";
import { getData, putData } from "@/src/services/apiHub";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import useHasPermission from "@/src/functions/hasPermission";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import StickyFooter from "@/components/Dialog/StickyFooter/StickyFooter";
import Header from "@/components/Header/Header";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import FilterSection from "@/components/FilterSection/FilterSection";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";

type UserType = {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    status: "فعال" | "غیر فعال";
    fetchAllUsers: any;
};

type Role = {
    id: number;
    name: string;
    permissions: {
        id: number;
        name: string;
        description: string;
        category: string;
    }[];
};

export default function Users() {
    const [filterType, setFilterType] = useState<string>("all");
    const [filterValue, setFilterValue] = useState<string>("all");
    const [loadingRoles, setLoadingRoles] = useState(false);
    const [users, setUsers] = useState<UserType[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);

    const fetchRoles = useCallback(async () => {
        setLoadingRoles(true);
        getData({ endPoint: `/v1/admin/roles` })
            .then((data) => {
                setRoles(data?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoadingRoles(false));
    }, []);

    const fetchUsersByStatus = useCallback(() => {
        console.log("status");
        setLoading(true);

        getData({
            endPoint: `/v1/admin/users`,
            params: {
                status: filterValue,
                sortBy,
                asc,
                page,
                pageSize: resultPerPage,
            },
        })
            .then((data) => {
                console.log(data?.data);
                setUsers(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [filterValue, sortBy, asc, page, resultPerPage]);

    const fetchUsersByRole = useCallback(() => {
        console.log("role");
        setLoading(true);
        getData({
            endPoint: `/v1/admin/roles/${filterValue}/owners`,
            params: { status: filterValue, sortBy, asc },
        })
            .then((data) => {
                console.log(data?.data);
                setUsers(data?.data?.data);
                setPaginationInfo(data?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [filterValue, sortBy, asc]);

    const fetchAllUsers = useCallback(() => {
        setLoading(true);
        console.log("all users");
        getData({
            endPoint: `/v1/admin/users?status=1&status=2`,
            params: { sortBy, asc, page, pageSize: resultPerPage },
        })
            .then((data) => {
                console.log("all", data?.data?.data);
                setUsers(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [sortBy, asc, page, resultPerPage]);

    useEffect(() => {
        fetchAllUsers();
        fetchRoles();
    }, [fetchAllUsers, fetchRoles]);

    useEffect(() => {
        if (filterValue === "all") {
            fetchAllUsers();
        } else if (filterType === "role") {
            fetchUsersByRole();
        } else if (filterType === "status") {
            fetchUsersByStatus();
        }
    }, [
        filterType,
        filterValue,
        fetchAllUsers,
        fetchUsersByStatus,
        fetchUsersByRole,
    ]);

    return (
        <>
            <div className="flex place-items-center w-full">
                {/* <Header header="مدیریت کاربران" /> */}

                <FilterSection
                    header="مدیریت کاربران"
                    columnsListApiRoute={`/v1/user/sortable`}
                    asc={asc}
                    setAsc={setAsc}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    resultPerPage={resultPerPage}
                    setPage={setPage}
                    setResultPerPage={setResultPerPage}
                >
                    <div className="flex gap-4 rtl sm:ltr w-full">
                        <Select
                            defaultValue="all"
                            onValueChange={(value) => {
                                setFilterType(value);
                                setFilterValue("all");
                            }}
                        >
                            <SelectTrigger
                                dir="rtl"
                                className="flex w-full min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
                            >
                                <SelectValue placeholder="فیلتر بر اساس" />
                            </SelectTrigger>
                            <SelectContent dir="rtl">
                                <SelectItem
                                    value="all"
                                    className="cursor-pointer"
                                >
                                    همه کاربران
                                </SelectItem>
                                <SelectItem
                                    value="role"
                                    className="cursor-pointer"
                                >
                                    بر اساس نقش‌ها
                                </SelectItem>
                                <SelectItem
                                    value="status"
                                    className="cursor-pointer"
                                >
                                    بر اساس وضعیت
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {filterType === "role" ? (
                            <Select
                                onValueChange={(value) => setFilterValue(value)}
                                defaultValue="all"
                                disabled={loadingRoles}
                            >
                                <SelectTrigger
                                    dir="rtl"
                                    className="flex w-full min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
                                >
                                    <SelectValue
                                        placeholder={
                                            loadingRoles
                                                ? "در حال بارگذاری..."
                                                : "انتخاب نقش"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent dir="rtl">
                                    <SelectItem value="all">
                                        همه نقش‌ها
                                    </SelectItem>
                                    {roles.map((role) => (
                                        <SelectItem
                                            key={role.id}
                                            value={String(role.id)}
                                            className="cursor-pointer"
                                        >
                                            {role.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : filterType === "status" ? (
                            <Select
                                value={filterValue}
                                onValueChange={(value) => setFilterValue(value)}
                                defaultValue="all"
                            >
                                <SelectTrigger
                                    dir="rtl"
                                    className="flex min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
                                >
                                    <SelectValue placeholder="وضعیت" />
                                </SelectTrigger>
                                <SelectContent dir="rtl">
                                    <SelectItem
                                        value="all"
                                        className="cursor-pointer"
                                    >
                                        همه وضعیت‌ها
                                    </SelectItem>
                                    <SelectItem
                                        value="1"
                                        className="cursor-pointer"
                                    >
                                        فعال
                                    </SelectItem>
                                    <SelectItem
                                        value="2"
                                        className="cursor-pointer"
                                    >
                                        مسدود
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        ) : (
                            <></>
                        )}
                    </div>
                </FilterSection>
            </div>
            <div className="flex flex-col w-full text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
                {/* <FilterUsers
					onFilteredUsers={setUsers}
					setLoading={setLoading}
				/> */}
                {loading ? (
                    <div className="flex bg-[#F4F1F3] min-h-[50vh] justify-center items-center h-40">
                        <LoadingSpinner />
                        {/* <Loader2 className="animate-spin text-orange-500" size={32} /> */}
                    </div>
                ) : users && users?.length === 0 ? (
                    <div className="neu-container">
                        <NoRecordFound text="کاربری پیدا نشد." />
                    </div>
                ) : (
                    users &&
                    users?.map((user) => (
                        <UserItem
                            key={`user-${user.id}-${user.phone}`}
                            id={user.id}
                            firstName={user.firstName}
                            lastName={user.lastName}
                            phone={user.phone}
                            status={user.status}
                            fetchAllUsers={fetchAllUsers}
                            // onManageRoles={handleManageRoles}
                        />
                    ))
                )}
            </div>
            <CustomPagination
                currentPage={page}
                setCurrentPage={setPage}
                paginationInfo={paginationInfo}
            />
        </>
    );
}

const UserItem = ({
    firstName,
    lastName,
    phone,
    status,
    id,
    fetchAllUsers,
}: UserType) => {
    const hasBanUnbanPermission = useHasPermission("user.ban_unban");
    const hasChangeRolePermission = useHasPermission("user.changeRole");

    const [loadingRoles, setLoadingRoles] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isBanning, setIsBanning] = useState(false);
    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [userRoles, setUserRoles] = useState<number[]>([]);
    const [open, setOpen] = useState(false);
    const handleRoleChange = (roleId: number) => {
        setUserRoles((prev) =>
            prev.includes(roleId)
                ? prev.filter((id) => id !== roleId)
                : [...prev, roleId]
        );
    };
    useEffect(() => {
        getData({ endPoint: `/v1/admin/users/${id}/roles` })
            .then((data) => {
                setUserRoles(data?.data?.map((role: Role) => role.id));
            })
            .catch((err) => console.log(err));
        setLoadingRoles(true);
        getData({ endPoint: `/v1/admin/roles` })
            .then((data) => {
                setAllRoles(data?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoadingRoles(false));
    }, [id]);
    const saveRoles = async () => {
        setIsSaving(true);
        const formData = {
            roleIDs: userRoles,
        };
        putData({
            endPoint: `/v1/admin/users/${id}/roles`,
            data: formData,
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                fetchAllUsers();
                setOpen(false);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsSaving(false));
    };
    const handleBanAction = async () => {
        const action = status === "فعال" ? "ban" : "unban";
        setIsBanning(true);
        putData({ endPoint: `/v1/admin/users/${id}/${action}` })
            .then((data) => {
                CustomToast(data?.message, "success");
                // setCurrentUserStatus(
                // 	currentUserStatus === "فعال" ? "غیر فعال" : "فعال"
                // );
                fetchAllUsers();
            })
            .catch((err) => console.log(err))
            .finally(() => setIsBanning(false));
    };
    return (
        <div className="flex flex-row justify-between w-full h-full bg-[#F4F1F3] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-center">
            <div className="flex items-center gap-3 w-1/4">
                <div className={`${styles.icon} bg-white text-[#FA682D]`}>
                    <User className="m-1" />
                </div>
                <p>
                    {firstName} {lastName}
                </p>
            </div>
            <div className="flex items-center gap-3 w-1/4">
                <div className={`${styles.icon} bg-white text-[#FA682D]`}>
                    <Phone className="m-1" />
                </div>
                <p>{phone.slice(-10)}</p>
            </div>
            <div className="flex items-center gap-3 w-1/4">
                <div className="flex items-center gap-2">
                    <span className="font-bold">
                        {status === "فعال" ? "فعال" : "مسدود"}
                    </span>
                    <div
                        className={`h-4 w-4 rounded-full ${
                            status === "فعال" ? "bg-green-500" : "bg-red-500"
                        } shadow-md`}
                    />
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <div
                        className={`bg-white ${styles.button} text-[#FA682D] flex gap-2 items-center p-2 hover:cursor-pointer`}
                    >
                        <p className="font-bold">جزئیات بیشتر و مدیریت</p>
                        <Settings />
                    </div>
                </DialogTrigger>
                <DialogContent
                    className={`max-h-[80vh] overflow-y-auto no-scrollbar rtl vazir dialog-width flex flex-col pb-0`}
                >
                    <div className="relative flex-1 overflow-y-auto no-scrollbar">
                        <DialogHeader>
                            <DialogTitle className="text-blue-800 text-right">
                                مدیریت نقش‌های کاربر
                            </DialogTitle>
                        </DialogHeader>

                        {loadingRoles ? (
                            <div className="flex justify-center items-center">
                                <LoadingSpinner className="w-full h-full" />
                                {/* <Loader2 className="animate-spin text-orange-500 h-8 w-8" /> */}
                            </div>
                        ) : (
                            <div className="space-y-3 py-4">
                                {allRoles?.map((role) => (
                                    <div
                                        key={role.id}
                                        className="flex items-center gap-3 p-2"
                                    >
                                        <div className="relative">
                                            <input
                                                name={`role-${role.id}`}
                                                type="checkbox"
                                                disabled={
                                                    !hasChangeRolePermission
                                                }
                                                defaultChecked={userRoles.includes(
                                                    role.id
                                                )}
                                                onChange={() =>
                                                    handleRoleChange(role.id)
                                                }
                                                className={`peer h-5 w-5 ${
                                                    hasChangeRolePermission
                                                        ? "cursor-pointer"
                                                        : "cursor-not-allowed"
                                                } transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500 mt-0.5`}
                                            />
                                            <Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " />
                                        </div>
                                        <label
                                            htmlFor={`role-${role.id}`}
                                            className="text-gray-700 cursor-pointer"
                                        >
                                            {role.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sticky footer */}
                    <StickyFooter footerClassName="grid grid-cols-2 gap-4">
                        {/* Left-aligned buttons container */}
                        <div className="flex justify-start">
                            {hasBanUnbanPermission && (
                                <Button
                                    onClick={handleBanAction}
                                    // disabled={isBanning}
                                    className={`px-4 py-2 rounded-lg cursor-pointer min-w-32 ${
                                        status === "فعال"
                                            ? "bg-red-500 hover:bg-red-600"
                                            : "bg-green-500 hover:bg-green-600"
                                    }`}
                                >
                                    {isBanning ? (
                                        <LoadingOnButton />
                                    ) : // <Loader2 className="animate-spin h-4 w-4 ml-2" />
                                    status === "فعال" ? (
                                        <p>مسدود کردن</p>
                                    ) : (
                                        <p>رفع انسداد</p>
                                    )}
                                </Button>
                            )}
                        </div>

                        <div className="flex justify-end gap-2">
                            <CancelButton />

                            <Button
                                onClick={saveRoles}
                                className="bg-orange-500 cursor-pointer hover:bg-orange-600 min-w-28"
                            >
                                {isSaving ? (
                                    <LoadingOnButton />
                                ) : (
                                    <p>ذخیره تغییرات</p>
                                )}
                            </Button>
                        </div>
                    </StickyFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
