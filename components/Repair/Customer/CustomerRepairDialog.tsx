"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Siren, AlertCircle, Eclipse, Calendar } from "lucide-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import moment from "jalali-moment";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface RepairHistoryItem {
  ID: number;
  Subject: string;
  Description: string;
  Status: string;
  UrgencyLevel: string;
  CreatedAt: string;
  OwnerID: number;
  CorporationID: number;
  PanelID: number;
  Panel: {
    id: number;
    panelName: string;
    corporationName: string;
    power: number;
    area: number;
  };
}

interface RepairDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  repairItem: RepairHistoryItem | null;
}

const validationSchema = Yup.object({
  problem: Yup.string()
    .required("لطفا مشکل را توضیح دهید")
    .min(10, "توضیحات باید حداقل 10 کاراکتر باشد"),
});
const RepairDetailsDialog = ({
  isOpen,
  onClose,
  repairItem,
}: RepairDetailsDialogProps) => {
  if (!repairItem) return null;
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const handleSubmit = async (values: { problem: string }) => {
    try {
      console.log(values);
      const repairHistoryId = repairItem.ID;
      const response = await fetch(
        `http://46.249.99.69:8080/v1/user/report/maintenance/${repairHistoryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            description: values.problem,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Handle success
      const data = await response.json();
      toast.success(data?.message);
      onClose();
    } catch (error: any) {
      const errMsg =
        generateErrorMessage(error) || "هنگام ایجاد گزارش جدید مشکلی پیش آمد.";
      toast.error(errMsg);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        style={{ backgroundColor: "#FEFEFE" }}
        className="min-w-[57vw] h-[80vh]"
      >
        <DialogHeader>
          <DialogTitle className="flex justify-center items-end font-bold mt-3.5">
            جزئیات تعمیرات
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(80vh-100px)] pr-2">
          <div dir="rtl" className="flex flex-col gap-5">
            {/* Repair Info Section */}
            <div className="inset-neu-container !w-full !p-5 !bg-[#FEFEFE]">
              <h3 className="text-xl font-semibold text-navy-blue mb-4">
                {repairItem.Subject}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Eclipse
                      size={14}
                      strokeWidth={2.5}
                      className="text-fire-orange"
                    />
                    <span className="text-sm text-gray-500">نام پنل</span>
                  </div>
                  <span className="text-lg font-medium">
                    {repairItem.Panel.panelName}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Siren
                      size={16}
                      strokeWidth={2.5}
                      className="text-fire-orange"
                    />
                    <span className="text-sm text-gray-500">سطح اهمیت</span>
                  </div>
                  <span className="text-lg font-medium">
                    {repairItem.UrgencyLevel === "low"
                      ? "اولویت پایین"
                      : repairItem.UrgencyLevel === "high"
                      ? "اولویت بالا"
                      : "اولویت متوسط"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Calendar
                      size={14}
                      strokeWidth={2.5}
                      className="text-fire-orange"
                    />
                    <span className="text-sm text-gray-500">تاریخ</span>
                  </div>
                  <span className="text-lg font-medium">
                    {moment(repairItem.CreatedAt.slice(0, 10), "YYYY-MM-DD")
                      .locale("fa")
                      .format("YYYY/MM/DD")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <AlertCircle
                      size={14}
                      strokeWidth={2.5}
                      className="text-fire-orange"
                    />
                    <span className="text-sm text-gray-500">وضعیت</span>
                  </div>
                  <span className="text-lg font-medium">
                    {repairItem.Status === "completed"
                      ? "تکمیل شده"
                      : repairItem.Status === "in_progress"
                      ? "در حال انجام"
                      : "در انتظار"}
                  </span>
                </div>
              </div>
            </div>

            {/* Repair Notes */}
            <div className="inset-neu-container !w-full !p-5 !bg-[#FEFEFE]">
              <h4 className="text-lg font-semibold text-navy-blue mb-3">
                توضیحات تعمیر
              </h4>
              <p className="text-gray-700">{repairItem.Description}</p>
            </div>

            {/* Problem Report Form */}
            <div className="w-full mt-5 border-t border-gray-300 pt-5">
              <h4 className="text-lg font-semibold text-navy-blue">
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
                      className="self-end
                                                    bg-gradient-to-br from-[#34C759] to-[#00A92B]
                                                    hover:from-[#2AAE4F] hover:to-[#008C25]
                                                    active:from-[#008C25] active:to-[#2AAE4F]
                                                    text-white py-2 px-4 rounded-md transition-all duration-300"
                    >
                      ارسال گزارش
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RepairDetailsDialog;
