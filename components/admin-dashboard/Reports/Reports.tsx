"use client";
import styles from "./Reports.module.css";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { toast } from "sonner";
import { MessageCirclePlus, MessageCircleMore, ArrowLeft } from "lucide-react";

const Reports = () => {
  const [panelReports, setPanelReports] = useState<any[]>([]);
  const [maintenanceReports, setMaintenanceReports] = useState<any[]>([]);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const fetchPanelReports = () => {
    fetch("http://46.249.99.69:8080/v1/admin/report/panel", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPanelReports(data.data);
      })
      .catch((err) => {
        const errMsg =
          generateErrorMessage(err) || "مشکلی در دریافت گزارش‌های پنل رخ داد.";
        toast.error(errMsg);
      });
  };

  const fetchMaintenanceReports = () => {
    fetch("http://46.249.99.69:8080/v1/admin/report/maintenance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMaintenanceReports(data.data);
      })
      .catch((err) => {
        const errMsg =
          generateErrorMessage(err) ||
          "مشکلی در دریافت گزارش‌های تعمیر و نگهداری رخ داد.";
        toast.error(errMsg);
      });
  };

  const resolveReport = async (reportId: string) => {
    try {
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/report/resolve/${reportId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );

      if (!response.ok) throw new Error("Failed to resolve report");

      const result = await response.json();
      toast.success(result?.message);

      // Refresh both lists, or only one if you're tracking origin
      fetchPanelReports();
      fetchMaintenanceReports();
    } catch (error: any) {
      const errMsg =
        generateErrorMessage(error) || "هنگام بررسی گزارش مشکلی پیش آمد.";
      toast.error(errMsg);
    }
  };

  useEffect(() => {
    fetchPanelReports();
    fetchMaintenanceReports();
  }, []);

  const MaintenanceReport = ({
    id,
    Description,
    MaintenanceRecord,
    Status,
  }: {
    id: string;
    Description: string;
    Status: string;
    MaintenanceRecord: {
      Customer: {
        firstName: string;
        lastName: string;
      };
      Operator: {
        firstName: string;
        lastName: string;
      };
      Title: string;
      Details: string;
      Date: string;
    };
  }) => {
    return (
      <div className="flex flex-row justify-between w-full h-full bg-white gap-10 py-5 px-10 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 min-h-[250px]">
        {/* Right section */}
        <div className="w-5/6 flex flex-col gap-3 justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-start content-start w-full text-2xl font-bold">
              گزارش مربوط به سابقه تعمیر {MaintenanceRecord.Title}
            </p>
            <p className="text-start content-start w-full text-lg">
              از طرف {MaintenanceRecord.Customer.firstName}{" "}
              {MaintenanceRecord.Customer.lastName}
            </p>
            <p className="text-start content-start w-full text-lg">
              اپراتور : {MaintenanceRecord.Operator.firstName}{" "}
              {MaintenanceRecord.Operator.lastName}
            </p>
            <p className="max-w-[600px] break-words">
              شرح جزئیات : {MaintenanceRecord.Details}
            </p>
          </div>

          {/* Bottom - Description */}
          <div>
            <p className="max-w-[600px] break-words font-medium">
              شرح گزارش : {Description}
            </p>
          </div>
        </div>

        {/* Left section */}
        <div className="w-1/5 pr-5 flex flex-col gap-4">
          <div
            className={`flex flex-col items-center ${styles.status} py-4 gap-2`}
          >
            <span className="text-[#636363] font-bold">
              {new Date(MaintenanceRecord.Date).toLocaleDateString("fa-IR")}
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

  const PanelReport = ({
    id,
    Description,
    Status,
    Panel,
  }: {
    id: string;
    Description: string;
    Status: string;
    Panel: {
      Name: string;
      PanelName: string;
      Customer: {
        firstName: string;
        lastName: string;
      };
      Corporation: {
        name: string;
      };
    };
  }) => {
    return (
      <div className="flex flex-row justify-between w-full h-full bg-white gap-10 py-5 px-10 overflow-hidden relative border-t border-gray-300 first:border-t-0 min-h-[250px]">
        {/* Right section */}
        <div className="w-5/6 flex flex-col gap-3 justify-between">
          <div className="flex flex-col gap-3">
            <p className="text-start w-full text-2xl font-bold">
              گزارش مربوط به پنل: {Panel.PanelName}
            </p>
            <p className="text-start w-full text-lg">
              مشتری: {Panel.Customer.firstName} {Panel.Customer.lastName}
            </p>
            <p className="text-start w-full text-lg">
              شرکت: {Panel.Corporation.name}
            </p>
            <p className="max-w-[600px] break-words">
              شرح گزارش: {Description}
            </p>
          </div>
        </div>

        {/* Left section */}
        <div className="w-1/5 pr-5 flex flex-col gap-4">
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
    <div className="space-y-12 mt-10">
      {/* Maintenance Reports Section */}
      <section className="bg-white rounded-xl shadow-md  p-6">
        <h2 className="text-right text-2xl font-bold text-blue-800 mb-6  pb-4">
          گزارش‌های تعمیر و نگهداری
        </h2>
        <div className="space-y-6">
          {maintenanceReports.length > 0 ? (
            maintenanceReports.map((report) => (
              <MaintenanceReport
                key={report.id}
                id={report.ID}
                Description={report.Description}
                Status={report.Status === "resolved" ? "بررسی شده" : "بررسی نشده"}
                MaintenanceRecord={report.MaintenanceRecord}
              />
            ))
          ) : (
            <p className="text-gray-500 text-right">هیچ گزارشی موجود نیست.</p>
          )}
        </div>
      </section>

      {/* Panel Reports Section */}
      <section className="bg-white rounded-xl shadow-md  p-6">
        <h2 className="text-right text-2xl font-bold text-blue-800 mb-6  pb-4">
          گزارش‌های پنل
        </h2>
        <div className="space-y-6">
          {panelReports.length > 0 ? (
            panelReports.map((report) => (
              <PanelReport
                key={report.id}
                id={report.ID}
                Description={report.Description}
                Status={report.Status === "resolved" ? "بررسی شده" : "بررسی نشده"}
                Panel={report.Panel}
              />
            ))
          ) : (
            <p className="text-gray-500 text-right">هیچ گزارشی موجود نیست.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reports;
