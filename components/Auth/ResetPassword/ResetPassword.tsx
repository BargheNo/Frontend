"use client";
import { useState } from "react";
import { MoveLeft, Lock, Unlock, Smartphone } from "lucide-react";
import styles from "./ResetPassword.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Custom/CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";
import LoginButton from "../Login/LoginButton";
import { toast } from "sonner";
import { useSelector } from "react-redux";
// import { RootState } from "@/src/store/types";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { postData } from "@/src/services/apiHub";

const validationSchema = Yup.object({
	password: Yup.string()
		.min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.")
		.matches(/[a-z]/, ".رمز عبور باید شامل حداقل یک حرف کوچک باشد")
		.matches(/[A-Z]/, ".رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
		.matches(/\d/, ".رمز عبور باید شامل حداقل یک عدد باشد")
		.matches(/[\W_]/, ".رمز عبور باید شامل حداقل یک نماد باشد")
		.required("رمز عبور جدید الزامی است"),
	confirmPassword: Yup.string()
		.oneOf(
			[Yup.ref("password")],
			".تأیید رمز عبور جدید باید با رمز عبور جدید مطابقت داشته باشد"
		)
		.required("تایید رمز عبور جدید الزامی است"),
});

const initialValues = {
	password: "",
	confirmPassword: "",
};

const ResetPassword = () => {
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	

const handleFormSubmit = async (values: {
	password: string;
	confirmPassword: string;
}) => {
	const { confirmPassword, password } = values;

	try {
		const response = await postData({
			endPoint: "/v1/user/auth/reset-password",
			data: {
				password,
				confirmPassword,
			},
			accessToken: accessToken,
		});

		if (response?.statusCode === 200) {
			toast.success(response?.message);
			window.location.href = "/dashboard";
		}
	} catch (error: any) {
		const errMsg =
			generateErrorMessage(error) || "هنگام تغییر رمز عبور مشکلی پیش آمد.";
		toast.error(errMsg);
		setErrorMessage(errMsg);
	}
};


	return (
		<div className={`${vazir.className} min-h-screen w-full`}>
			<div dir="rtl" className={styles.mainbg}>
				<div className="w-full max-w-md p-6 space-y-4 shadow-2xl rounded-2xl bg-[#f1f4fc]">
					<h2 className="text-3xl text-black text-center">
						{"تغییر رمز عبور"}
					</h2>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleFormSubmit}
					>
						<Form className="w-full flex flex-col items-center gap-3 text-black">
							<div className="w-full">
								<CustomInput
									name="password"
									icon={showPassword ? Unlock : Lock}
									type={showPassword ? "text" : "password"}
									onIconClick={() =>
										setShowPassword((prev) => !prev)
									}
								>
									رمز عبور جدید
								</CustomInput>
								<CustomInput
									name="confirmPassword"
									icon={showConfirmPassword ? Unlock : Lock}
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									onIconClick={() =>
										setShowConfirmPassword((prev) => !prev)
									}
								>
									تایید رمز عبور جدید
								</CustomInput>
							</div>
							{errorMessage && (
								<p className="text-red-600 text-sm">
									{errorMessage}
								</p>
							)}
							<LoginButton>
								{"تغییر رمز عبور"}
								<MoveLeft />
							</LoginButton>
						</Form>
					</Formik>

					<p className="flex gap-5 justify-center text-center text-sm text-blue-600"></p>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
