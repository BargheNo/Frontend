"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    Phone,
    Settings,
    User,
    CircleX,
    Loader2,
    Check,
    Search,
    CheckIcon,
} from "lucide-react";
import styles from "./styles.module.css";
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
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

type UserType = {
    id: number;
    staff: {
        firstName: string;
        lastName: string;
        phone: string;
    };
    roles: Role[];
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
    const [open, setOpen] = useState(false);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>("");
    const corpID = useSelector((state: RootState) => state.user.corpId);

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
        // console.log("status");
        setLoading(true);

        getData({
            endPoint: `/v1/admin/users`,
            params: {
                status: filterValue,
                sortBy,
                asc,
                page,
                pageSize: resultPerPage,
                query,
            },
        })
            .then((data) => {
                console.log(data?.data);
                setUsers(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [filterValue, sortBy, asc, page, resultPerPage, query]);

    const fetchUsersByRole = useCallback(() => {
        // console.log("role");
        setLoading(true);
        getData({
            endPoint: `/v1/admin/roles/${filterValue}/owners`,
            params: { status: filterValue, sortBy, asc, query },
        })
            .then((data) => {
                console.log(data?.data);
                setUsers(data?.data?.data);
                setPaginationInfo(data?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [filterValue, sortBy, asc, query]);

    const fetchAllUsers = useCallback(() => {
        setLoading(true);
        console.log("all users", query);
        getData({
            endPoint: `/v1/corp/${corpID}/staff`,
            params: { sortBy, asc, page, pageSize: resultPerPage, query },
        })
            .then((data) => {
                console.log("all", data?.data?.data);
                setUsers(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [sortBy, asc, page, resultPerPage, query, corpID]);

    useEffect(() => {
        fetchAllUsers();
        fetchRoles();
    }, [fetchAllUsers, fetchRoles]);
    const updateUsers = useCallback(() => {
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

    useEffect(() => {
        updateUsers();
    }, [updateUsers]);

    return (
        <>
            <div className="flex place-items-center w-full">
                <FilterSection
                    header="اعضای شرکت"
                    columnsListApiRoute={`/v1/user/sortable`}
                    asc={asc}
                    setAsc={setAsc}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    resultPerPage={resultPerPage}
                    setPage={setPage}
                    setResultPerPage={setResultPerPage}
                    query={query}
                    setQuery={setQuery}
                    onSearchSubmit={() => updateUsers()}
                >
                    <div
                        className={`flex gap-4 ltr sm:rtl w-full ${
                            filterType === "all" && "sm:w-40"
                        }`}
                    >
                        <Select
                            defaultValue="all"
                            onValueChange={(value) => {
                                setFilterType(value);
                                setFilterValue("all");
                            }}
                        >
                            <SelectTrigger
                                dir="rtl"
                                className="flex w-full sm:w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
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
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-full sm:min-w-32 sm:max-w-60 relative rtl bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] justify-between gap-2"
                                    >
                                        {filterValue === "all" ? "همه" : ""}
                                        {filterValue
                                            ? roles.find(
                                                  (perm) =>
                                                      perm.id ===
                                                      Number(filterValue)
                                              )?.name
                                            : "فیلتر بر اساس دسترسی"}
                                        {/* <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                                        <Search className="shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="جستجوی نقش‌ها..." />
                                        <CommandList className="no-scrollbar">
                                            <CommandEmpty>
                                                هیچ نقشی پیدا نشد.
                                            </CommandEmpty>
                                            <CommandGroup>
                                                <CommandItem
                                                    value={"all"}
                                                    onSelect={() => {
                                                        setFilterValue(
                                                            String("all")
                                                        );
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            filterValue ===
                                                                "all"
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {"همه"}
                                                </CommandItem>
                                                {roles?.map((role: Role) => (
                                                    <CommandItem
                                                        key={role?.id}
                                                        value={String(
                                                            role?.name
                                                        )}
                                                        onSelect={() => {
                                                            setFilterValue(
                                                                String(role?.id)
                                                            );

                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <CheckIcon
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                filterValue ===
                                                                    String(
                                                                        role?.id
                                                                    )
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {role?.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        ) : filterType === "status" ? (
                            <Select
                                value={filterValue}
                                onValueChange={(value) => setFilterValue(value)}
                                defaultValue="all"
                            >
                                <SelectTrigger
                                    dir="rtl"
                                    className="flex w-full sm:min-w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
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
                        <NoRecordFound text="عضوی پیدا نشد." />
                    </div>
                ) : (
                    users &&
                    users?.map((user) => (
                        <UserItem
                            key={`user-${user.id}-${user.staff.phone}`}
                            id={user.id}
                            staff={user.staff}
                            status={user.status}
                            roles={user.roles}
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

const UserItem = ({ staff, roles, status, id, fetchAllUsers }: UserType) => {
    const [loadingRoles, setLoadingRoles] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isBanning, setIsBanning] = useState(false);
    const [allRoles, setAllRoles] = useState<Role[]>([]);
    const [userRoles, setUserRoles] = useState<number[]>([]);
    const [open, setOpen] = useState(false);
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const handleRoleChange = (roleId: number) => {
        setUserRoles((prev) =>
            prev.includes(roleId)
                ? prev.filter((id) => id !== roleId)
                : [...prev, roleId]
        );
    };
    useEffect(() => {
        getData({ endPoint: `/v1/corp/${corpId}/staff/roles` })
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
    }, [id, corpId]);
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
    return (
        <div className="flex lg:flex-row flex-col justify-between w-full h-full bg-[#F4F1F3] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 lg:items-center lg:gap-10 md:text-wrap text-nowrap gap-5 items-start">
            <div className="flex items-center gap-3 w-1/4">
                <div className={`${styles.icon} bg-white text-[#FA682D]`}>
                    <User className="m-1" />
                </div>
                <p>
                    {staff.firstName} {staff.lastName}
                </p>
            </div>
            <div className="flex items-center gap-3 w-1/4">
                <div className={`${styles.icon} bg-white text-[#FA682D]`}>
                    <Phone className="m-1" />
                </div>
                <p>{staff.phone.slice(-10)}</p>
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
                        {/* <p className="font-bold">جزئیات بیشتر و مدیریت</p> */}
                        <Settings />
                    </div>
                </DialogTrigger>
                <DialogContent
                    className={`max-h-[80vh] overflow-y-auto no-scrollbar rtl vazir dialog-width flex flex-col pb-0`}
                >
                    <div className="relative flex-1 overflow-y-auto no-scrollbar">
                        <DialogHeader>
                            <DialogTitle className="text-blue-800 text-right">
                                افزودن عضو جدید
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
                                                defaultChecked={userRoles.includes(
                                                    role.id
                                                )}
                                                onChange={() =>
                                                    handleRoleChange(role.id)
                                                }
                                                className={`peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500 mt-0.5`}
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
                    <StickyFooter>
                        <div className="flex justify-end gap-2 md:mt-0 mt-12">
                            <CancelButton />
                            <Button
                                onClick={saveRoles}
                                className="bg-orange-500 cursor-pointer hover:bg-orange-600 min-w-28"
                            >
                                {isSaving ? (
                                    <LoadingOnButton />
                                ) : (
                                    <p>افزودن عضو</p>
                                )}
                            </Button>
                        </div>
                    </StickyFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
