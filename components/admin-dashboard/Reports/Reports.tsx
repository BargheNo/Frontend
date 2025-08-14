"use client";
import styles from "./Reports.module.css";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    ArrowLeft,
    User,
    Hammer,
    ReceiptText,
    CircleAlert,
    School,
    Eclipse,
} from "lucide-react";
import Header from "@/components/Header/Header";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { getData, postData } from "@/src/services/apiHub";
import useHasPermission from "@/src/functions/hasPermission";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import SubmitButton from "@/components/Dialog/SubmitButton/SubmitButton";
import CancelButton from "@/components/Dialog/CancelButton/CancelButton";
import FilterSection from "@/components/FilterSection/FilterSection";

const Reports = () => {
    const {
        hasPermission: hasRespondReportPermission,
        loading: permissionLoading,
    } = useHasPermission("report.respond");
    const [loadingRepair, setLoadingRepair] = useState<boolean>(true);
    const [loadingPanel, setLoadingPanel] = useState<boolean>(true);
    const [panelReports, setPanelReports] = useState<any[]>([]);
    const [maintenanceReports, setMaintenanceReports] = useState<any[]>([]);
    const [panelStatus, setPanelStatus] = useState<string>("");
    const [maintenanceStatus, setMaintenanceStatus] = useState<string>("");
    const [maintenanceQuery, setMaintenanceQuery] = useState<string>("");
    const [panelQuery, setPanelQuery] = useState<string>("");
    const fetchPanelReports = useCallback(() => {
        setLoadingPanel(true);
        getData({
            endPoint: `/v1/admin/report/panel`,
            params: { status: panelStatus, query: panelQuery },
        })
            .then((data) => {
                console.log(data?.data?.data);
                setPanelReports(data?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoadingPanel(false));
    }, [panelStatus, panelQuery]);

    const fetchMaintenanceReports = useCallback(() => {
        setLoadingRepair(true);
        getData({
            endPoint: `/v1/admin/report/maintenance`,
            params: { status: maintenanceStatus, query: maintenanceQuery },
        })
            .then((data) => {
                setMaintenanceReports(data?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoadingRepair(false));
    }, [maintenanceStatus, maintenanceQuery]);

    const resolveReport = async (reportId: string) => {
        postData({ endPoint: `/v1/admin/report/resolve/${reportId}` })
            .then((data) => {
                CustomToast(data?.message, "success");
                fetchPanelReports();
                fetchMaintenanceReports();
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchPanelReports();
        fetchMaintenanceReports();
    }, [fetchPanelReports, fetchMaintenanceReports]);

    const MaintenanceReport = ({
        id,
        description,
        maintenanceRecord,
        Status,
    }: {
        id: string;
        description: string;
        Status: string;
        maintenanceRecord: {
            customer: {
                firstName: string;
                lastName: string;
            };
            operator: {
                firstName: string;
                lastName: string;
            };
            Title: string;
            details: string;
            date: string;
        };
    }) => {
        return (
            <>
                {/* <Header header="گزارشات" /> */}
                {/* <FilterSection header="گزارشات" /> */}
                <div className="flex flex-row justify-between w-full h-full gap-10 py-5 px-10 overflow-hidden relative border-t-1 border-gray-300 bg-[#F0EDEF] first:border-t-0 min-h-[250px]">
                    {/* Right section */}
                    <div className="w-5/6 flex flex-col justify-around relative">
                        <div className="flex flex-col gap-3 relative">
                            <p className="text-start content-start w-full text-2xl font-bold">
                                گزارش مربوط به سابقه تعمیر{" "}
                                {maintenanceRecord?.Title}
                            </p>
                            <div className="flex flex-row gap-2">
                                <User className="text-orange-500"></User>
                                <p className="text-start content-start w-full text-lg">
                                    از طرف:{" "}
                                    {maintenanceRecord?.customer?.firstName}{" "}
                                    {maintenanceRecord?.customer?.lastName}
                                </p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <Hammer className="text-orange-500"></Hammer>
                                <p className="text-start content-start w-full text-lg">
                                    اپراتور :{" "}
                                    {maintenanceRecord?.operator?.firstName}{" "}
                                    {maintenanceRecord?.operator?.lastName}
                                </p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <ReceiptText className="text-orange-500"></ReceiptText>
                                <p className="max-w-[600px] break-words">
                                    شرح جزئیات : {maintenanceRecord?.details}
                                </p>
                            </div>
                        </div>

                        {/* Bottom - description */}
                        <div className="flex flex-row gap-2 relative">
                            <CircleAlert className="text-orange-500"></CircleAlert>
                            <p className="max-w-[600px] break-words font-medium">
                                شرح گزارش : {description}
                            </p>
                        </div>
                    </div>

                    {/* Left section */}
                    <div className="w-1/5 pr-5 flex flex-col gap-4 relative">
                        <div
                            className={`flex flex-col items-center ${styles.status} py-4 gap-2 relative`}
                        >
                            <span className="text-[#636363] font-bold">
                                {new Date(
                                    maintenanceRecord?.date
                                ).toLocaleDateString("fa-IR")}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{Status}</span>
                                <div
                                    className={`h-4 w-4 rounded-full ${
                                        Status === "بررسی شده" ? "green" : "red"
                                    }-status shadow-md`}
                                />
                            </div>
                        </div>

                        <div
                            className={`cta-neu-button flex ${styles.button} items-center content-center justify-center`}
                            onClick={() => resolveReport(id)}
                        >
                            <button className="cursor-pointer">بررسی</button>
                            <ArrowLeft />
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const PanelReport = ({
        id,
        description,
        Status,
        Panel,
    }: {
        id: string;
        description: string;
        Status: string;
        Panel: {
            name: string;
            panelName: string;
            customer: {
                firstName: string;
                lastName: string;
            };
            corporation: {
                name: string;
            };
        };
    }) => {
        return (
            <div className="flex flex-col md:flex-row justify-between w-full h-full gap-6 md:gap-10 py-4 md:py-5 px-4 md:px-10 overflow-hidden relative border-t border-gray-300 first:border-t-0 min-h-[150px]">
                {/* Right section */}
                <div className="w-full md:w-5/6 flex flex-col gap-3 justify-between relative">
                    <div className="flex flex-col gap-3 relative">
                        <p className="text-start w-full text-lg sm:text-xl md:text-2xl font-bold">
                            گزارش مربوط به پنل: {Panel?.name}
                        </p>
                        <div className="flex flex-row flex-wrap gap-2">
                            <User className="text-orange-500" />
                            <p className="text-start w-full sm:w-auto text-base sm:text-lg">
                                از طرف: {Panel?.customer?.firstName}{" "}
                                {Panel?.customer?.lastName}
                            </p>
                        </div>
                        <div className="flex flex-row flex-wrap gap-2">
                            <School className="text-orange-500" />
                            <p className="text-start w-full sm:w-auto text-base sm:text-lg">
                                شرکت: {Panel?.corporation?.name}
                            </p>
                        </div>
                        {/* <div className="flex flex-row flex-wrap gap-2">
                            <Eclipse className="text-orange-500" />
                            <p className="text-start w-full sm:w-auto text-base sm:text-lg">
                                نام پنل: {Panel?.name}
                            </p>
                        </div> */}
                    </div>
                </div>

                {/* Left section */}
                <div className="w-full sm:w-3/4 md:w-2/5 relative flex flex-col justify-around gap-4 md:gap-2 mt-4 md:mt-0 h-full">
                    {/* Status Box */}
                    <div
                        className={`flex flex-col ${styles.status} py-4 gap-2 relative flex-1 min-h-[60px] md:min-h-[80px] place-items-center`}
                    >
                        <div className="flex md:flex-row flex-col items-center gap-2 h-full place-self-center m-auto">
                            <span className="font-bold text-nowrap">
                                {Status}
                            </span>
                            <div
                                className={`h-4 w-4 rounded-full ${
                                    Status === "بررسی شده" ? "green" : "red"
                                }-status shadow-md`}
                            />
                        </div>
                    </div>

                    {/* Button */}
                    {hasRespondReportPermission && Status !== "بررسی شده" && (
                        <Dialog>
                            <DialogTrigger>
                                <div
                                    className={`cta-neu-button flex ${styles.button} items-center justify-center mt-4 md:mt-10  px-4 py-2`}
                                >
                                    <div className="cursor-pointer flex items-center gap-2">
                                        مشاهده جزئیات
                                        <ArrowLeft />
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="rtl">
                                <DialogHeader>
                                    <DialogTitle>جزئیات گزارش</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    {description}
                                </DialogDescription>
                                <DialogFooter>
                                    <CancelButton>بازگشت</CancelButton>
                                    <SubmitButton
                                        onClick={() => resolveReport(id)}
                                    >
                                        بررسی شد
                                    </SubmitButton>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="">
            {/* Maintenance Reports Section */}
            {/* <Header header="گزارش‌های تعمیر و نگهداری" /> */}
            <FilterSection
                header="گزارش‌های تعمیر و نگهداری"
                fieldName="گزارش"
                status={maintenanceStatus}
                setStatus={setMaintenanceStatus}
                statusesListApiRoute={`/v1/report/status`}
                query={maintenanceQuery}
                setQuery={setMaintenanceQuery}
            />
            {loadingRepair ? (
                <LoadingSpinner />
            ) : (
                <section
                    className={`no-scrollbar relative flex flex-col bg-[#F0EDEF] max-h-[80vh] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] mb-5`}
                >
                    <div>
                        {maintenanceReports.length === 0 ? (
                            <NoRecordFound text="هیچ گزارشی موجود نیست." />
                        ) : (
                            maintenanceReports.map((report) => (
                                <MaintenanceReport
                                    key={report.id}
                                    id={report.id}
                                    description={report.description}
                                    Status={
                                        report.status === "resolved"
                                            ? "بررسی شده"
                                            : "بررسی نشده"
                                    }
                                    maintenanceRecord={report.maintenanceRecord}
                                />
                            ))
                        )}
                    </div>
                </section>
            )}

            {/* Panel Reports Section */}
            {/* <Header header="گزارش‌های پنل" className="mt-8" /> */}
            <FilterSection
                header="گزارش‌های پنل"
                fieldName="گزارش"
                status={panelStatus}
                setStatus={setPanelStatus}
                statusesListApiRoute={`/v1/report/status`}
                query={panelQuery}
                setQuery={setPanelQuery}
            />
            {loadingPanel ? (
                <LoadingSpinner />
            ) : (
                <section className="no-scrollbar relative flex flex-col bg-[#F0EDEF] max-h-[80vh] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] mb-5">
                    <div>
                        {panelReports.length > 0 ? (
                            panelReports.map((report) => (
                                <PanelReport
                                    key={report.id}
                                    id={report.id}
                                    description={report.description}
                                    Status={
                                        report.status
                                        // report.status === "درحال بررسی"
                                        //     ? "بررسی نشده"
                                        //     : "بررسی شده"
                                    }
                                    Panel={report.panel}
                                />
                            ))
                        ) : (
                            <NoRecordFound text="هیچ گزارشی موجود نیست." />
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Reports;
