"use client";
import styles from "./CorpMnagement.module.css";
import React, { useCallback, useEffect, useState } from "react";
import {
    Loader2,
    Settings,
    Phone,
    MapPinHouse,
    School,
    IdCard,
    CreditCard,
    Building2,
    Building,
    StretchHorizontal,
    Mail,
    DoorClosed,
    BellRing,
    ContactRound,
    Newspaper,
    User,
} from "lucide-react";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { useSelector } from "react-redux";
import { FilterCorps } from "./FilterCorps";
import CorpProfile from "./CorpProfile";
import { getData, postData, putData } from "@/src/services/apiHub";
import {
    Dialog,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import useHasPermission from "@/src/functions/hasPermission";
import Header from "@/components/Header/Header";
import FilterSection from "@/components/FilterSection/FilterSection";
import StickyFooter from "@/components/Dialog/StickyFooter/StickyFooter";
import SubmitButton from "@/components/Dialog/SubmitButton/SubmitButton";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import CustomPagination from "@/components/Custom/CustomPagination/CustomPagination";

interface CorporationType {
    id: number;
    name: string;
    logo: string;
    contactInfo: Array<{
        id: number;
        contactType: {
            id: number;
            name: string;
        };
        value: string;
    }>;
    addresses: Array<{
        id: number;
        province: string;
        provinceID: number;
        cityID: number;
        city: string;
        streetAddress: string;
        postalCode: string;
        houseNumber: string;
        unit: number;
    }>;
}

interface CorporationDetailType {
    id: number;
    name: string;
    registrationNumber: string;
    nationalID: string;
    iban: string;
    logo: string;
    vatTaxpayerCertificate: string;
    officialNewspaperAD: string;
    signatories: Array<{
        id: number;
        name: string;
        nationalCardNumber: string;
        position: string;
    }>;
    contactInfo: Array<{
        id: number;
        contactType: {
            id: number;
            name: string;
        };
        value: string;
    }>;
    addresses: Array<{
        id: number;
        province: string;
        city: string;
        streetAddress: string;
        postalCode: string;
        houseNumber: string;
        unit: number;
    }>;
}

const CorporationItem = ({
    name,
    logo,
    contactInfo,
    addresses,
    id,
}: CorporationType) => {
    const hasApproveDeclinePermission = useHasPermission(
        "corporation.approveDecline"
    );
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [corporation, setCorporation] =
        useState<CorporationDetailType | null>(null);

    const fetchCorporationDetails = async () => {
        setLoading(true);
        getData({ endPoint: `v1/admin/corporation/${id}` })
            .then((data) => {
                console.log("data", data);
                setCorporation(data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };
    const handleAccept = async () => {
        postData({
            endPoint: `/v1/admin/corporation/${id}/approve`,
            data: {},
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                setOpen(false);
                fetchCorporationDetails();
            })
            .catch((err) => console.log(err));
    };

    const handleReject = async () => {
        postData({
            endPoint: `/v1/admin/corporation/${id}/reject`,
            data: { action: 2 },
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                setOpen(false);
                fetchCorporationDetails();
            })
            .catch((err) => console.log(err));
    };

    const handleSuspend = async () => {
        postData({
            endPoint: `/v1/admin/corporation/${id}/reject`,
            data: { action: 3 },
        })
            .then((data) => {
                CustomToast(data?.message, "success");
                setOpen(false);
                fetchCorporationDetails();
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className="flex flex-row justify-between w-full h-full bg-[#F4F1F3] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-center">
            <div className="flex items-center gap-3 w-1/4">
                {logo ? (
                    <img
                        src={logo}
                        alt={`${name} logo`}
                        className="w-10 h-10 rounded-full border border-orange-400"
                    />
                ) : (
                    <div
                        className={`w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-orange-400`}
                    >
                        <span className="text-gray-500 text-xs">لوگو</span>
                    </div>
                )}
                <p className="font-medium">{name}</p>
            </div>

            <div className="flex items-center gap-3 w-1/4">
                <div className="text-orange-400">
                    <Phone />
                </div>
                <p>اطلاعات تماس: {contactInfo.length > 0 ? "دارد" : "ندارد"}</p>
            </div>

            <div className="flex items-center gap-3 w-1/4">
                <div className="text-orange-400">
                    <MapPinHouse />
                </div>
                <p>آدرس: {addresses.length > 0 ? "دارد" : "ندارد"}</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <div
                        className={`bg-white ${styles.detailsButton} text-[#FA682D] flex gap-2 items-center p-2 hover:cursor-pointer`}
                    >
                        <p className="font-bold">مشاهده پروفایل و مدیریت</p>
                        <Settings />
                    </div>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto dialog-width pb-0">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <LoadingSpinner className="h-full" />
                            {/* <Loader2
								className="animate-spin text-orange-500"
								size={32}
							/> */}
                        </div>
                    ) : (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-right text-2xl text-blue-800">
                                    مشخصات شرکت
                                </DialogTitle>
                            </DialogHeader>

                            {/* General Information */}
                            <div
                                className={`flex flex-row justify-between gap-4 p-4 rounded-lg mb-4 rtl ${styles.shadow} min-h-40`}
                            >
                                <div className="flex flex-col justify-between items-start">
                                    <div className="flex flex-row gap-2">
                                        <div className="text-orange-400">
                                            <School />
                                        </div>
                                        <p className="text-2xl">
                                            {corporation?.name}
                                        </p>
                                        <p className="text-sm text-gray-500 py-4">
                                            <span className="font-semibold">
                                                شماره ثبت:
                                            </span>
                                            {corporation?.registrationNumber}
                                        </p>
                                    </div>
                                    <div className="flex flex-row gap-10">
                                        <div className="flex flex-row gap-2">
                                            <div className="text-orange-400">
                                                <IdCard />
                                            </div>
                                            <p>
                                                <span className="font-semibold">
                                                    شناسه ملی:
                                                </span>
                                                {corporation?.nationalID}
                                            </p>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <div className="text-orange-400">
                                                <CreditCard />
                                            </div>
                                            <p>
                                                <span className="font-semibold">
                                                    شماره شبا:
                                                </span>
                                                {corporation?.iban}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {corporation?.logo ? (
                                    <img
                                        src={corporation.logo}
                                        alt={`${corporation.name} logo`}
                                        className="w-20 h-20 rounded-full border border-orange-400"
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-orange-400">
                                        <span className="text-gray-500 text-xs">
                                            لوگو
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Contact Info */}
                            <div
                                className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} min-h-40`}
                            >
                                <h3 className="font-bold text-xl text-blue-800">
                                    اطلاعات تماس
                                </h3>
                                {corporation?.contactInfo &&
                                corporation?.contactInfo?.length > 0 ? (
                                    corporation?.contactInfo.map((contact) => (
                                        <div
                                            key={contact.id}
                                            className="flex gap-2"
                                        >
                                            <div className="text-orange-400">
                                                <Phone />
                                            </div>
                                            <span className="font-semibold">
                                                {contact?.contactType?.name}:
                                            </span>
                                            <span>{contact?.value}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p>اطلاعات تماس موجود نیست</p>
                                )}
                            </div>

                            {/* Addresses */}
                            <div
                                className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} min-h-40`}
                            >
                                <h3 className="font-bold text-xl text-blue-800">
                                    آدرس‌ها
                                </h3>
                                {corporation?.addresses &&
                                corporation?.addresses?.length > 0 ? (
                                    corporation?.addresses?.map((address) => (
                                        <div
                                            key={address?.id}
                                            className="flex flex-col gap-1"
                                        >
                                            <div className="flex flex-row ">
                                                <div className="flex flex-row w-1/3 gap-1 ">
                                                    <div className="text-orange-400">
                                                        <Building2 />
                                                    </div>
                                                    <p>
                                                        <span className="font-semibold">
                                                            استان:
                                                        </span>
                                                        {address?.province}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row w-1/3 gap-1">
                                                    <div className="text-orange-400">
                                                        <Building />
                                                    </div>
                                                    <p>
                                                        <span className="font-semibold">
                                                            شهر:
                                                        </span>
                                                        {address?.city}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row w-1/3 gap-1 ">
                                                    <div className="text-orange-400">
                                                        <StretchHorizontal />
                                                    </div>
                                                    <p>
                                                        <span className="font-semibold">
                                                            خیابان:
                                                        </span>
                                                        {address?.streetAddress}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-row">
                                                <div className="flex flex-row w-1/3 gap-1 ">
                                                    <div className="text-orange-400">
                                                        <Mail />
                                                    </div>
                                                    <p>
                                                        <span className="font-semibold">
                                                            کد پستی:
                                                        </span>
                                                        {address?.postalCode}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row w-1/3 gap-1">
                                                    <div className="text-orange-400">
                                                        <DoorClosed />
                                                    </div>
                                                    <p>
                                                        <span className="font-semibold">
                                                            پلاک:
                                                        </span>
                                                        {address?.houseNumber}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row w-1/3 gap-1 ">
                                                    <div className="text-orange-400">
                                                        <BellRing />
                                                    </div>
                                                    <p>
                                                        <span className="font-semibold">
                                                            واحد:
                                                        </span>
                                                        {address?.unit}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>آدرسی ثبت نشده است</p>
                                )}
                            </div>

                            {/* Signatories */}
                            <div
                                className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} min-h-40`}
                            >
                                <h3 className="font-bold text-xl text-blue-800">
                                    امضا کنندگان
                                </h3>
                                {corporation?.signatories &&
                                corporation?.signatories?.length > 0 ? (
                                    corporation?.signatories?.map(
                                        (signatory) => (
                                            <div
                                                key={signatory?.id}
                                                className="flex flex-row gap-1"
                                            >
                                                <div className="w-1/3 flex flex-row gap-1 ">
                                                    <div className="text-orange-400">
                                                        <User />
                                                    </div>
                                                    <p>
                                                        <span className="font-semibold">
                                                            نام:
                                                        </span>
                                                        {signatory?.name}
                                                    </p>
                                                </div>
                                                <div className="w-1/3 flex flex-row gap-1">
                                                    <div className="text-orange-400">
                                                        <IdCard />
                                                    </div>
                                                    <p>
                                                        <span className="font-semibold">
                                                            کد ملی:
                                                        </span>
                                                        {
                                                            signatory?.nationalCardNumber
                                                        }
                                                    </p>
                                                </div>
                                                <div className="w-1/3 flex flex-row gap-1">
                                                    <div className="text-orange-400">
                                                        <ContactRound />
                                                    </div>
                                                    <p>
                                                        <span className="font-semibold">
                                                            سمت:
                                                        </span>
                                                        {signatory?.position}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <p>امضا کننده‌ای ثبت نشده است</p>
                                )}
                            </div>

                            {/* Documents */}
                            <div
                                className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} min-h-40`}
                            >
                                <h3 className="font-bold text-xl text-blue-800">
                                    مدارک
                                </h3>
                                <div className="flex flex-row gap-4">
                                    {corporation?.vatTaxpayerCertificate && (
                                        <div className="w-1/2">
                                            <div className="flex flex-row gap-1">
                                                <div className="text-orange-400">
                                                    <Newspaper />
                                                </div>
                                                <p className="font-semibold mb-2">
                                                    گواهی ارزش افزوده:
                                                </p>
                                            </div>

                                            <div className=" rounded-lg overflow-hidden">
                                                <img
                                                    src={
                                                        corporation?.vatTaxpayerCertificate
                                                    }
                                                    alt="گواهی ارزش افزوده"
                                                    className="w-full h-auto object-cover max-h-60 rounded-lg"
                                                    onError={(e) => {
                                                        (
                                                            e.target as HTMLImageElement
                                                        ).src =
                                                            "/images/document-fallback.png";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {corporation?.officialNewspaperAD && (
                                        <div className="w-1/2">
                                            <div className="flex flex-row gap-1">
                                                <div className="text-orange-400">
                                                    <Newspaper />
                                                </div>
                                                <p className="font-semibold mb-2">
                                                    آگهی روزنامه رسمی:
                                                </p>
                                            </div>
                                            <div className=" rounded-lg overflow-hidden">
                                                <img
                                                    src={
                                                        corporation.officialNewspaperAD
                                                    }
                                                    alt="آگهی روزنامه رسمی"
                                                    className="w-full h-auto rounded-lg object-cover max-h-60 "
                                                    onError={(e) => {
                                                        (
                                                            e.target as HTMLImageElement
                                                        ).src =
                                                            "/images/document-fallback.png";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {hasApproveDeclinePermission && (
                                <StickyFooter className="rtl">
                                    <CancelButton />
                                    <div className="flex gap-2">
                                        <SubmitButton
                                            loading={loading}
                                            onClick={handleSuspend}
                                            className="from-yellow-600 to-yellow-700 hover:from-yellow-500 hover:to-yellow-600 active:from-yellow-700 active:to-yellow-500"
                                        >
                                            معلق کردن
                                        </SubmitButton>
                                        <SubmitButton
                                            loading={loading}
                                            onClick={handleReject}
                                            className="from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:from-red-700 active:to-red-500"
                                        >
                                            رد کردن
                                        </SubmitButton>
                                        <SubmitButton
                                            loading={loading}
                                            onClick={handleAccept}
                                        >
                                            تایید کردن
                                        </SubmitButton>
                                    </div>
                                </StickyFooter>
                                // <DialogFooter className="sm:justify-start gap-2">
                                // 	{/* <Button
                                // 		className="bg-green-600 hover:bg-green-700 min-w-30 cursor-pointer"
                                // 		onClick={handleAccept}
                                // 	>
                                // 		تایید
                                // 	</Button> */}
                                // 	<Button
                                // 		className="min-w-30 bg-red-600 hover:bg-red-700 cursor-pointer"
                                // 		onClick={handleReject}
                                // 	>
                                // 		رد
                                // 	</Button>
                                // 	<Button
                                // 		className="min-w-30 bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
                                // 		onClick={handleSuspend}
                                // 	>
                                // 		معلق
                                // 	</Button>
                                // </DialogFooter>
                            )}
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
const CorpManagement = () => {
    const [corporations, setCorporations] = useState<CorporationType[]>([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("5");
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [paginationInfo, setPaginationInfo] = useState<
        paginationInfoType | undefined
    >(undefined);
    const [page, setPage] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");

    const fetchAllCorporations = useCallback(() => {
        setLoading(true);
        getData({
            endPoint: `/v1/admin/corporation`,
            params: {
                status,
                page,
                sortBy,
                asc,
                pageSize: resultPerPage,
                query,
            },
        })
            .then((data) => {
                setCorporations(data?.data?.data);
                setPaginationInfo(data?.data?.pagination);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [status, page, resultPerPage, sortBy, asc, query]);

    useEffect(() => {
        fetchAllCorporations();
    }, [fetchAllCorporations]);

    return (
        <>
            <div className="flex flex-col">
                <FilterSection
                    header="شرکت های فعلی"
                    fieldName="شرکت"
                    statusesListApiRoute={`/v1/admin/corporation/status`}
                    status={status}
                    setStatus={setStatus}
                    resultPerPage={resultPerPage}
                    setResultPerPage={setResultPerPage}
                    setPage={setPage}
                    columnsListApiRoute={`/v1/corporation/sortable`}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    asc={asc}
                    setAsc={setAsc}
                    query={query}
                    setQuery={setQuery}
                />
                {loading ? (
                    <div className="flex justify-center items-center">
                        <LoadingSpinner className="h-full" />
                    </div>
                ) : (
                    <div className="flex flex-col w-full neu-container">
                        {corporations &&
                            corporations?.map((corporation) => (
                                <CorporationItem
                                    key={corporation.id}
                                    {...corporation}
                                />
                            ))}
                    </div>
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

export default CorpManagement;
