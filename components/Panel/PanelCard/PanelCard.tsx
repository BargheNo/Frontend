"use client";
import React, { useState } from "react";
import {
  MoveLeft,
  Sun,
  Battery,
  TrendingUp,
  MapPin,
  AlertCircle,
  X,
} from "lucide-react";
import { PanelCardProps } from "@/src/types/PanelCardTypes";
import Link from "next/link";
import IconWithBackground from "@/components/IconWithBackground/IconWithBackground";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Modal from "./ReportModal";

const PanelCard = ({
  id,
  panelName,
  technicalDetails,
  address,
  className,
}: PanelCardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const handleSubmit = async (values: { problem: string }) => {
    try {
      const panelId = id;

      const payload = {
        description: values.problem,
      };

      const response = await fetch(
        `http://46.249.99.69:8080/v1/user/report/panel/${panelId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      toast.success(data?.message);
      setModalOpen(false);

      if (!response.ok) {
        throw new Error("API error: " + JSON.stringify(data));
      }
    } catch (error: any) {
      const errMsg =
        generateErrorMessage(error) || "هنگام ایجاد گزارش جدید مشکلی پیش آمد.";
      toast.error(errMsg);
    }
  };

  const validationSchema = Yup.object({
    problem: Yup.string().required("وارد کردن توضیحات ضروری است."),
  });

  const getStatusColor = () => {
    const efficiency = technicalDetails.efficiency;
    if (efficiency >= 80)
      return "bg-gradient-to-br from-green-400 to-green-500 border-1 border-gray-100/50 shadow-sm shadow-green-500";
    if (efficiency >= 60)
      return "bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-yellow-500";
    return "bg-gradient-to-br from-red-400 to-red-500 shadow-red-500";
  };

  const formatNumber = (num: number): string =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <>
      {/* === PANEL CARD === */}
      <div
        className={`${className} w-full border-t-1 border-gray-300 first:border-t-0`}
      >
        <div className="flex flex-row justify-between w-full h-full bg-[#F0EDEF] p-5 overflow-hidden relative">
          {/* LEFT */}
          <div className="flex flex-col justify-between w-full z-10">
            <div className="space-y-3 w-full">
              <h2 className="text-2xl font-bold text-gray-800">{panelName}</h2>
              <div className="space-y-2 w-full">
                <div className="flex text-sm text-gray-700 justify-between w-[28%] items-center">
                  <div className="flex items-center w-1/2">
                    <IconWithBackground icon={Battery} color="#6B7280" />
                    <span className="font-medium mr-2">ظرفیت:</span>
                  </div>
                  <div className="w-1/2">
                    <span className="mr-1">
                      {formatNumber(technicalDetails.capacity)} کیلووات
                    </span>
                  </div>
                </div>
                <div className="flex text-sm text-gray-700 justify-between w-[28%] items-center">
                  <div className="flex items-center w-1/2">
                    <IconWithBackground icon={Sun} color="#F59E0B" />
                    <span className="font-medium mr-2">تولید امروز:</span>
                  </div>
                  <div className="w-1/2">
                    <span className="mr-1">
                      {formatNumber(technicalDetails.todayProduction)} کیلووات
                      ساعت
                    </span>
                  </div>
                </div>
                <div className="flex text-sm text-gray-700 justify-between w-[28%] items-center">
                  <div className="flex items-center w-1/2">
                    <IconWithBackground icon={TrendingUp} color="#3B82F6" />
                    <span className="font-medium mr-2">بازدهی:</span>
                  </div>
                  <div className="w-1/2">
                    <span className="mr-1">{technicalDetails.efficiency}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start text-sm text-gray-700 mt-6">
              <div className="flex flex-row items-center">
                <IconWithBackground icon={MapPin} color="#6B7280" />
                <div className="font-medium mx-2">آدرس:</div>
              </div>
              <div className="flex flex-row mt-[6px]">
                <span className="mr-1">{address}</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-around gap-4 items-center z-10 min-w-48">
            <div className="flex flex-col gap-4">
              <div className="text-gray-700 font-medium">وضعیت پنل:</div>
              <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)] w-24">
                <div
                  className={`h-4 w-4 rounded-full ${getStatusColor()} shadow-md`}
                ></div>
                <span className="text-sm font-medium text-gray-600">فعال</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="w-40 flex items-center justify-between bg-gradient-to-r from-[#EE4334] to-[#D73628] px-4 py-2 text-white cursor-pointer shadow-md rounded-full hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <span className="font-medium">گزارش مشکل</span>
                <AlertCircle className="mr-2 w-4 h-4" />
              </button>
              <Link href={`my-panels/123`}>
                <button className="w-40 flex items-center justify-between bg-gradient-to-r from-[#EE4334] to-[#D73628] px-4 py-2 text-white cursor-pointer shadow-md rounded-full hover:shadow-lg transition duration-300 hover:scale-105">
                  <span className="font-medium">مدیریت پنل</span>
                  <MoveLeft className="mr-2 w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h4 className="text-lg font-semibold text-navy-blue mb-4">
          گزارش مشکل
        </h4>
        <Formik
          initialValues={{ problem: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              <CustomTextArea
                name="problem"
                icon={AlertCircle}
                textareaClassName="!bg-[#FEFEFE] h-32"
              >
                توضیحات مشکل
              </CustomTextArea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="self-end bg-gradient-to-br from-[#34C759] to-[#00A92B] hover:from-[#2AAE4F] hover:to-[#008C25] active:from-[#008C25] active:to-[#2AAE4F] text-white py-2 px-4 rounded-md transition-all duration-300"
              >
                ارسال گزارش
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default PanelCard;
