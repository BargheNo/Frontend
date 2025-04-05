"use client";
import { useState, useEffect } from "react";
import { MoveLeft, Lock, Unlock, Smartphone } from "lucide-react";
import Link from "next/link";
import styles from "./ForgotPassword.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Custom/CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";
import LoginButton from "../Login/LoginButton";
import { handleForgetPassword } from "../../../src/services/apiHub";
import PhoneVerification from "@/components/phoneVerification/phoneVerification";
import { phonenumberVerification } from "@/src/services/apiHub";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
	phoneNumber: Yup.string()
		.matches(/^[0-9]{10}$/, "شماره تلفن باید ۱۰ رقم باشد")
		.required("شماره تلفن الزامی است"),
});

const initialValues = {
	phoneNumber: "",
};

const Login = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [open, setOpen] = useState(false);
	const [otpCode, setOtpCode] = useState<string>("");
	const route = useRouter();
	const handleOtpChange = (otp: string) => {
		setOtpCode(otp);
	};
	const [phone, setPhone] = useState<string>("");

	const handleFormSubmit = async (values: { phoneNumber: string }) => {
		const { phoneNumber } = values;
		const response = await handleForgetPassword(phoneNumber);
		setPhone(values.phoneNumber);

		if (response.success) {
			toast.success(response.data.message);
			setOpen(true);
		} else {
			toast.error(
				response.message || "بازیابی ناموفق بود دوباره تلاش کنید"
			);
		}
	};

	const handleVerification = async (phone: string, otp: string) => {
		try {
			const response = await phonenumberVerification(phone, otp);

			if (response.success) {
				route.push("/reset-password");
				toast.success(response.data.message);
			} else {
				toast.error(response.message || "Verification failed");
			}
		} catch (error) {
			toast.error("An error occurred during verification");
		}
	};

	useEffect(() => {
		if (otpCode.length === 6) {
			handleVerification(phone, otpCode);
		}
	}, [otpCode]);

	return (
		<div className={vazir.className}>
			<div dir="rtl" className={styles.mainbg}>
				<div className="w-full max-w-md p-6 space-y-4 shadow-2xl rounded-2xl bg-[#f1f4fc]">
					<h2 className="text-3xl text-black text-center">
						{"فراموشی رمز عبور"}
					</h2>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleFormSubmit}
					>
						<Form className="w-full flex flex-col items-center gap-3 text-black">
							<div className="flex flex-row justify-center gap-2">
								<div className="w-3/4">
									<CustomInput name="phoneNumber" type="tel">
										شماره تلفن همراه
									</CustomInput>
								</div>
								<div className="w-1/4">
									<CustomInput
										name="countryCode"
										readOnly={true}
										icon={Smartphone}
										type="text"
										value="+98"
									>
										+98
									</CustomInput>
								</div>
							</div>
							{errorMessage && (
								<p className="text-red-600 text-sm">
									{errorMessage}
								</p>
							)}
							<LoginButton>
								{"بازیابی رمز عبور"}
								<MoveLeft />
							</LoginButton>
							<PhoneVerification
								onlinkClick={() => setOpen(false)}
								onOtpChange={handleOtpChange}
								onclick={() => setOpen(false)}
								open={open}
							></PhoneVerification>
						</Form>
					</Formik>

					<p className="flex gap-5 justify-center text-center text-sm text-blue-600">
						<Link href="/signup">ثبت نام نکرده ام</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
