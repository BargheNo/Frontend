"use client";
import styles from "./Reports.module.css";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
	ArrowLeft,
	User,
	Hammer,
	ReceiptText,
	CircleAlert,
	School,
} from "lucide-react";
import Header from "@/components/Header/Header";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { getData, postData } from "@/src/services/apiHub";

const Reports = () => {
	const [loadingRepair, setLoadingRepair] = useState<boolean>(true);
	const [loadingPanel, setLoadingPanel] = useState<boolean>(true);
	const [panelReports, setPanelReports] = useState<any[]>([]);
	const [maintenanceReports, setMaintenanceReports] = useState<any[]>([]);
	const fetchPanelReports = () => {
		getData({ endPoint: `/v1/admin/report/panel` })
			.then((data) => {
				setPanelReports(data.data);
			})
			.finally(() => setLoadingPanel(false));
	};

	const fetchMaintenanceReports = () => {
		getData({ endPoint: `/v1/admin/report/maintenance` })
			.then((data) => {
				setMaintenanceReports(data.data);
			})
			.finally(() => setLoadingRepair(false));
	};

	const resolveReport = async (reportId: string) => {
		postData({ endPoint: `/v1/admin/report/resolve/${reportId}` }).then(
			(data) => {
				CustomToast(data?.message, "success");
				fetchPanelReports();
				fetchMaintenanceReports();
			}
		);
	};

	useEffect(() => {
		fetchPanelReports();
		fetchMaintenanceReports();
	}, []);

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
			<div className="flex flex-row justify-between w-full h-full gap-10 py-5 px-10 overflow-hidden relative border-t-1 border-gray-300 bg-[#F0EDEF] first:border-t-0 min-h-[250px]">
				{/* Right section */}
				<div className="w-5/6 flex flex-col justify-around">
					<div className="flex flex-col gap-3">
						<p className="text-start content-start w-full text-2xl font-bold">
							گزارش مربوط به سابقه تعمیر{" "}
							{maintenanceRecord?.Title}
						</p>
						<div className="flex flex-row gap-2">
							<User className="text-orange-500"></User>
							<p className="text-start content-start w-full text-lg">
								از طرف: {maintenanceRecord?.customer?.firstName}{" "}
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
					<div className="flex flex-row gap-2">
						<CircleAlert className="text-orange-500"></CircleAlert>
						<p className="max-w-[600px] break-words font-medium">
							شرح گزارش : {description}
						</p>
					</div>
				</div>

				{/* Left section */}
				<div className="w-1/5 pr-5 flex flex-col gap-4">
					<div
						className={`flex flex-col items-center ${styles.status} py-4 gap-2`}
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
			Name: string;
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
			<div className="flex flex-row justify-between w-full h-full gap-10 py-5 px-10  overflow-hidden relative border-t border-gray-300 first:border-t-0 min-h-[150px]">
				{/* Right section */}
				<div className="w-5/6 flex flex-col gap-3 justify-between">
					<div className="flex flex-col gap-3">
						<p className="text-start w-full text-2xl font-bold">
							گزارش مربوط به پنل: {Panel?.panelName}
						</p>
						<div className="flex flex-row gap-2">
							<User className="text-orange-500"></User>
							<p className="text-start w-full text-lg">
								از طرف: {Panel?.customer?.firstName}{" "}
								{Panel?.customer?.lastName}
							</p>
						</div>
						<div className="flex flex-row gap-2">
							<School className="text-orange-500"></School>
							<p className="text-start w-full text-lg">
								شرکت: {Panel?.corporation?.name}
							</p>
						</div>
						<div className="flex flex-row gap-2">
							<CircleAlert className="text-orange-500"></CircleAlert>
							<p className="max-w-[600px] break-words">
								شرح گزارش: {description}
							</p>
						</div>
					</div>
				</div>

				{/* Left section */}
				<div className="w-1/5 pr-5 flex flex-col justify-around">
					<div
						className={`flex flex-col items-center ${styles.status} py-4 gap-2`}
					>
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
					>
						<button
							className="cursor-pointer"
							onClick={() => resolveReport(id)}
						>
							بررسی
						</button>

						<ArrowLeft />
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="space-y-12 ">
			{/* Maintenance Reports Section */}
			<Header header="گزارش‌های تعمیر و نگهداری" />
			{loadingRepair ? (
				<LoadingSpinner />
			) : (
				<section
					className={`no-scrollbar flex flex-col bg-[#F0EDEF] max-h-[80vh] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] mb-5`}
				>
					<div>
						{maintenanceReports.length === 0 ? (
							<p className="text-gray-500 text-right p-5">
								هیچ گزارشی موجود نیست.
							</p>
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
			<Header header="گزارش‌های پنل" className="mt-8" />
			{loadingPanel ? (
				<LoadingSpinner />
			) : (
				<section className="no-scrollbar flex flex-col bg-[#F0EDEF] max-h-[80vh] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] mb-5">
					<div>
						{panelReports.length > 0 ? (
							panelReports.map((report) => (
								<PanelReport
									key={report.id}
									id={report.id}
									description={report.description}
									Status={
										report.status === "resolved"
											? "بررسی شده"
											: "بررسی نشده"
									}
									Panel={report.panel}
								/>
							))
						) : (
							<p className="text-gray-500 text-right p-5">
								هیچ گزارشی موجود نیست.
							</p>
						)}
					</div>
				</section>
			)}
		</div>
	);
};

export default Reports;
