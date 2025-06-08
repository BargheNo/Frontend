import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { NotebookPen, Captions } from "lucide-react";
import { baseURL, postData } from "@/src/services/apiHub";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import CustomTextArea from "@/components/Custom/CustomTextArea/CustomTextArea";
import { RepairFormValues } from "@/types/CorpTypes";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";

interface RepairFormProps {
	panelId: number;
	onSuccess: () => void;
}

const validationSchema = Yup.object().shape({
	title: Yup.string().required("عنوان الزامی است"),
	details: Yup.string().required("جزئیات الزامی است"),
	guaranteeViolation: Yup.object().shape({
		reason: Yup.string().when("isGuaranteeViolation", {
			is: true,
			then: () => Yup.string().required("دلیل نقض گارانتی الزامی است"),
		}),
		details: Yup.string().when("isGuaranteeViolation", {
			is: true,
			then: () => Yup.string().required("جزئیات نقض گارانتی الزامی است"),
		}),
	}),
});

const RepairForm = ({ panelId, onSuccess }: RepairFormProps) => {
	const initialValues: RepairFormValues = {
		title: "",
		details: "",
		guaranteeViolation: {
			reason: "",
			details: "",
		},
	};

	const handleSubmit = async (values: RepairFormValues) => {
		postData({
			endPoint: `${baseURL}/v1/corp/2/maintenance/request/${panelId}/record`,    // TODO: add corpIDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
			data: values,
		}).then((res) => {
			CustomToast("یادداشت با موفقیت ثبت شد", "success");
			console.log("add record test" + res);
			onSuccess();
		}).catch((error) => {
			CustomToast("خطا در ثبت یادداشت", "error");
		})
	};

	return (
		<div className="flex flex-col gap-2 justify-center items-center !w-full !p-5 !bg-gray-50">
			<h4 className="text-lg self-start font-semibold text-navy-blue">
				ثبت یادداشت جدید
			</h4>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit, values, setFieldValue }) => (
					<form onSubmit={handleSubmit} className="w-full space-y-4">
						<div className="space-y-2">
							<CustomInput
								name="title"
								label="عنوان"
								icon={Captions}
								placeholder="عنوان یادداشت را وارد کنید"
							/>
							<CustomTextArea
								name="details"
								label="جزئیات"
								icon={NotebookPen}
								placeholder="جزئیات یادداشت را وارد کنید"
							/>
							<div className="space-y-2">
								<h5 className="text-sm font-medium text-gray-700">
									نقض گارانتی
								</h5>
								<CustomInput
									name="guaranteeViolation.reason"
									label="دلیل نقض گارانتی"
									icon={Captions}
									placeholder="دلیل نقض گارانتی را وارد کنید"
								/>
								<CustomTextArea
									name="guaranteeViolation.details"
									label="جزئیات نقض گارانتی"
									icon={NotebookPen}
									placeholder="جزئیات نقض گارانتی را وارد کنید"
								/>
							</div>
						</div>
						<button
							type="submit"
							className="w-full red-circle-button !p-3 !h-fit"
						>
							ثبت یادداشت
						</button>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default RepairForm;
