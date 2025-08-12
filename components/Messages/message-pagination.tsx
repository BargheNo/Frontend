"use client";

import { Save, Settings } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import style from "./style.module.css";

import LoadingSpinner from "../Loading/LoadingSpinner/LoadingSpinner";

import SignupButton from "../SignupButton/SignupButton";
import { Switch } from "@/components/ui/switch";
import {
    notificationSetting,
    notifType,
    Notification,
} from "@/src/types/notificationTypes";
import notificationService from "@/src/services/notificationService";
import CustomToast from "../Custom/CustomToast/CustomToast";

import Header from "../Header/Header";
import NotificationBox from "./Notfication/NotificationBox/NotificationBox";
import NotificationHeader from "./Notfication/NotificationHeader/NotificationHeader";
import NotificationContent from "./Notfication/NotificationContent/NotificationContent";
import { getData } from "@/src/services/apiHub";
import NoRecordFound from "../NoRecordFound/NoRecordFound";
import FilterSection from "../FilterSection/FilterSection";

export default function CorpMessagesPagination() {
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    // const [currpage, Setcurrpage] = useState<string>("1");
    // const [statuses, setStatuses] = useState<notifType[] | null>(null);
    const [status, setStatus] = useState<string>("1");

    // const [notifTypes, setNotifTypes] = useState<notifType[]>([]);
    const [notifSetting, setNotifSetting] = useState<notificationSetting[]>([]);
    const [disable, setDisable] = useState(true);
    const [notifId, setNotifId] = useState<number[]>([1, 2, 3, 4]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);
    const [nameFields, setNameFields] = useState<
        {
            id: number;
            name: string;
            isPushEnabled: boolean;
            isEmailEnabled: boolean;
        }[]
    >([]);

    useEffect(() => {
        // setLoading(true);
        // notificationService
        //     .getNotificationType()
        //     .then((data) => {
        //         // setNotifTypes(data?.data);
        //         setStatuses(data?.data);
        //         // setLoading(false);
        //     })
        //     .catch((err) => console.log(err))
        //     .finally(() => setLoading(false));
        notificationService
            .getNotificationSetting()
            .then((data) => {
                console.log(data?.data);
                setNotifSetting(data?.data);
            })
            .catch((err) => console.log(err));
    }, [status]);

    useEffect(() => {
        setLoading2(true);
        getData({
            endPoint: `/v1/user/notifications`,
            params: {
                notificationTypes: status,
                page,
                sortBy,
                asc,
                pageSize: resultPerPage,
            },
        })
            .then((data) => {
                // console.log(data?.data);
                setPaginationInfo(data?.data?.pagination);
                setNotifications(data?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading2(false));
        // notificationService
        // 	.getNotificationFielter(notifId, {
        // 		page: currpage,
        // 		pageSize: "4",
        // 	})
        // 	.then((data) => {
        // 		setNotifications(data?.data);
        // 	})
        // 	.catch((err) => console.log(err));
    }, [status, notifId, page, resultPerPage, sortBy, asc]);

    useEffect(() => {
        if (notifSetting && notifSetting.length > 0) {
            const values = notifSetting.map((item) => ({
                id: item.id,
                name: item.notificationType.name,
                isPushEnabled: item.isPushEnabled,
                isEmailEnabled: item.isEmailEnabled,
            }));
            setNameFields(values);
        }
    }, [notifSetting]);

    return (
        <>
            <Header header="تنظیمات اعلان‌ها" />
            <div className="flex flex-col text-white bg-transparent w-full relative">
                <div className="flex flex-col bg-[#F0EDEF] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] mb-5">
                    <div className="flex flex-row mr-auto md:ml-30 m-auto md:gap-17 gap-6">
                        <p className="mt-8 whitespace-nowrap">
                            دریافت از طریق وبسایت
                        </p>
                        <p className="mt-8 whitespace-nowrap">
                            دریافت از طریق ایمیل
                        </p>
                    </div>
                    <div className="flex flex-col text-gray-800 rounded-2xl no-scrollbar w-90/100 overflow-auto shadow-[inset_-6px_-6px_16px_rgba(255,255,255,0.8),inset_6px_6px_16px_rgba(0,0,0,0.2)] mt-6 m-auto md:h-65 h-60">
                        {notifSetting?.length <= 0 && loading ? (
                            <LoadingSpinner />
                        ) : (
                            notifSetting?.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row justify-between border-t-2 border-gray-300 h-1/4 items-center "
                                >
                                    <p className="text-gray-600 whitespace-nowrap md:mb-0 mb-9 md:mr-4 text-[0.9rem] ml-1">
                                        {item?.notificationType?.name}
                                    </p>

                                    <div className="flex flex-col">
                                        <div className="flex flex-row md:gap-37 gap-17 md:mt-0 mt-9 md:ml-23 md:mb-0 mb-5 mr-2">
                                            <Switch
                                                className="rtl"
                                                onClick={() =>
                                                    setNameFields((prev) =>
                                                        prev.map((Item) =>
                                                            Item?.name ===
                                                            item
                                                                ?.notificationType
                                                                ?.name
                                                                ? {
                                                                      ...Item,
                                                                      isPushEnabled:
                                                                          !Item.isPushEnabled,
                                                                  }
                                                                : Item
                                                        )
                                                    )
                                                }
                                                disabled={disable}
                                                checked={
                                                    nameFields.find(
                                                        (Item) =>
                                                            Item?.name ===
                                                            item
                                                                ?.notificationType
                                                                ?.name
                                                    )?.isPushEnabled || false
                                                }
                                            />
                                            <Switch
                                                className="rtl"
                                                onClick={() =>
                                                    setNameFields((prev) =>
                                                        prev.map((Item) =>
                                                            Item.name ===
                                                            item
                                                                ?.notificationType
                                                                ?.name
                                                                ? {
                                                                      ...Item,
                                                                      isEmailEnabled:
                                                                          !Item.isEmailEnabled,
                                                                  }
                                                                : Item
                                                        )
                                                    )
                                                }
                                                disabled={
                                                    item?.notificationType
                                                        ?.supportsEmail ===
                                                    false
                                                        ? true
                                                        : disable
                                                }
                                                checked={
                                                    nameFields.find(
                                                        (Item) =>
                                                            Item?.name ===
                                                            item
                                                                ?.notificationType
                                                                ?.name
                                                    )?.isEmailEnabled || false
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="md:w-3/10 w-6/10 mr-auto ml-auto mb-5">
                        <SignupButton
                            onClick={async () => {
                                if (!disable) {
                                    try {
                                        const responses = await Promise.all(
                                            nameFields.map((item) =>
                                                notificationService.changeNotificationSetting(
                                                    item?.id,
                                                    {
                                                        isPushEnabled:
                                                            item?.isPushEnabled,
                                                        isEmailEnabled:
                                                            item?.isEmailEnabled,
                                                    }
                                                )
                                            )
                                        );
                                        const successMessage =
                                            responses[responses.length - 1]
                                                ?.message;
                                        CustomToast(successMessage, "success");
                                    } catch (error) {
                                        CustomToast(
                                            "خطا در ذخیره‌سازی تنظیمات",
                                            "error"
                                        );

                                        console.log(error);
                                    }
                                }
                                setDisable(!disable);
                            }}
                            className="bg-[#FA682D]  text-white"
                        >
                            {disable ? "تنظیمات اعلان‌ها" : "ذخیرۀ تغییرات"}
                            {disable ? <Settings /> : <Save />}
                        </SignupButton>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-transparent w-full gap-4">
                <FilterSection
                    header="اعلان‌ها"
                    fieldName="اعلان"
                    statusesListApiRoute={`/v1/notifications/type`}
                    status={status}
                    setStatus={setStatus}
                    resultPerPage={resultPerPage}
                    setResultPerPage={setResultPerPage}
                    setPage={setPage}
                    // columnsListApiRoute={`/v1/notification/sortable`}
                    // sortBy={sortBy}
                    // setSortBy={setSortBy}
                    // asc={asc}
                    // setAsc={setAsc}
                />
                {loading2 ? (
                    <div className="neu-container">
                        <LoadingSpinner />
                    </div>
                ) : notifications && notifications.length > 0 ? (
                    <>
                        <div className="flex flex-col neu-container">
                            {/* <div className="flex flex-col text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]"> */}
                            {notifications.map((item, index) => (
                                <NotificationBox
                                    key={index}
                                    typeid={item?.type?.id}
                                    notificationContent={item}
                                    date="1404-2-2"
                                >
                                    <NotificationHeader
                                        topic={item?.type?.description}
                                        title={item?.data?.description}
                                    />
                                    <NotificationContent />
                                </NotificationBox>
                            ))}
                            {/* </div> */}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col neu-container">
                        <NoRecordFound text="هیچ اعلانی یافت نشد." />
                    </div>
                )}
            </div>
        </>
    );
}
