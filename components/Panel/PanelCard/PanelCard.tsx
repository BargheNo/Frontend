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
  ChevronDown,
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
  const [isExpanded, setIsExpanded] = useState(false);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const MAXLENGTH: number = 70;
  const truncateText = (text: string, maxLength: number = MAXLENGTH) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

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
        <div className="flex flex-col w-full h-full bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] p-5 overflow-hidden relative">
          {/* MAIN CONTENT DIV */}
          <div className="flex flex-row-reverse justify-between w-full mb-6">
            {/* LEFT SIDE - BUTTONS */}
            <div className="flex flex-col gap-3 w-[15%]">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center justify-between bg-gradient-to-r from-[#EE4334] to-[#D73628] px-4 py-2 text-white cursor-pointer shadow-md rounded-full hover:shadow-lg transition duration-300 hover:scale-105"
              >
                <span className="font-medium">گزارش مشکل</span>
                <AlertCircle className="mr-2 w-4 h-4" />
              </button>
              <Link href={`my-panels/123`}>
                <button className="w-full flex items-center justify-between bg-gradient-to-r from-[#EE4334] to-[#D73628] px-4 py-2 text-white cursor-pointer shadow-md rounded-full hover:shadow-lg transition duration-300 hover:scale-105">
                  <span className="font-medium">مدیریت پنل</span>
                  <MoveLeft className="mr-2 w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* RIGHT SIDE - STATS */}
            <div className="flex justify-between w-[70%]">
              <div className="w-fit rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                <div className="flex items-center">
                  <IconWithBackground icon={Battery} className="w-full justify-between" text={"ظرفیت"} color="#6B7280" />
                </div>
                <div className="flex flex-col m-3 items-center justify-center">
                  <div className="flex flex-row-reverse items-center gap-1">
                    <span className="text-3xl font-bold">
                      {formatNumber(technicalDetails.capacity)}
                    </span>
                    <span>kW</span>
                  </div>
                </div>
              </div>

              <div className="w-fit rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                <div className="flex items-center">
                  <IconWithBackground icon={Sun} className="w-full justify-between" text={"تولید امروز"} color="#F59E0B" />
                </div>
                <div className="flex flex-col m-3 items-center justify-center">
                  <div className="flex flex-row-reverse items-center gap-1">
                    <span className="text-3xl font-bold">
                      {formatNumber(technicalDetails.todayProduction)}
                    </span>
                    <span>kWh</span>
                  </div>
                </div>
              </div>

              <div className="w-fit rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                <div className="flex items-center">
                  <IconWithBackground icon={TrendingUp} className="w-full justify-between" text={"بازدهی"} color="#3B82F6" />
                </div>
                <div className="flex flex-col m-3 items-center justify-center">
                  <div className="flex flex-row-reverse items-center gap-1">
                    <span className="text-3xl font-bold">{technicalDetails.efficiency}</span>
                    <span>%</span>
                  </div>
                </div>
              </div>

              <div className="w-fit rounded-xl items-center shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
                <div className="flex items-center">
                  <IconWithBackground icon={AlertCircle} className="w-full justify-between" text={"وضعیت پنل"} color="#6B7280" />
                </div>
                <div className="flex flex-col m-3 items-center justify-center">
                  <div className="flex flex-row-reverse items-center gap-1">
                    <div
                      className={`h-4 w-4 rounded-full ${getStatusColor()} shadow-md`}
                    ></div>
                    <span className="text-sm font-medium text-gray-600">فعال</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ADDRESS DIV */}
          <div className="flex flex-col items-start text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <IconWithBackground text="آدرس" icon={MapPin} color="#6B7280" />
              <div className="flex flex-col">
                <div className={`transition-all duration-200 ${isExpanded ? 'opacity-100 max-h-48' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                  <span className="mr-1">{address}</span>
                </div>
                {!isExpanded && (
                  <div className="text-gray-600">
                    <span className="mr-1">{truncateText(address)}</span>
                  </div>
                )}
                {address.length > MAXLENGTH && (
                  <div 
                    className="flex items-center text-gray-400 mt-2 cursor-pointer"
                    onClick={() => setIsExpanded(!isExpanded)}>
                    <span className="font-medium">بیشتر</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                )}
              </div>
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
