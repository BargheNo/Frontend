"use client";
import { useState, useEffect } from "react";
import { MoveLeft, Smartphone } from "lucide-react";
import Link from "next/link";
import styles from "./ForgotPassword.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Custom/CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";
import LoginButton from "../Login/LoginButton";
import { postData } from "@/src/services/apiHub";
import PhoneVerification from "@/components/phoneVerification/phoneVerification";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/store/slices/userSlice";

const validationSchema = Yup.object({
	phoneNumber: Yup.string()
		.matches(/^[0-9]{10}$/, "شماره تلفن باید ۱۰ رقم باشد")
		.required("شماره تلفن الزامی است"),
});

const initialValues = {
	phoneNumber: "",
};

const ForgotPassword = () => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [otpCode, setOtpCode] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const route = useRouter();
	const [loading, setLoading] = useState(false);

	const handleOtpChange = (otp: string) => {
		setOtpCode(otp);
	};

	const handleFormSubmit = async (values: { phoneNumber: string }) => {
		const { phoneNumber } = values;
		const fullPhone = "+98" + phoneNumber;
		setLoading(true);
		postData({
			endPoint: "/v1/auth/forgot-password",
			data: { phone: fullPhone },
		})
			.then((data) => {
				CustomToast(data?.message, "success");
				setPhone(phoneNumber);
				setOpen(true);
			})
			.finally(() => setLoading(false));
	};

	const handleVerification = async (phone: string, otp: string) => {
		const fullPhone = "+98" + phone;
		postData({
			endPoint: "/v1/auth/confirm-otp",
			data: {
				phone: fullPhone,
				otp: otp,
			},
		}).then((data) => {
			dispatch(
				setUser({
					firstName: data.data.firstName,
					lastName: data.data.lastName,
					accessToken: data.data.accessToken,
					permissions: {},
					refreshToken: data.data.accessToken,
				})
			);
			CustomToast(data?.message, "success");
			route.push("/reset-password");
		});
	};

	useEffect(() => {
		if (otpCode.length === 6) {
			handleVerification(phone, otpCode);
		}
	}, [otpCode]);

	return (
		<div className={`${vazir.className} min-h-screen w-full`}>
			<div dir="rtl" className={styles.mainbg}>
				<div className="w-full sm:max-w-md p-4 sm:p-6 space-y-4 shadow-2xl rounded-2xl bg-[#f1f4fc]">
					<h2 className="text-3xl text-black text-center">
						{"فراموشی رمز عبور"}
					</h2>

					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleFormSubmit}
					>
						<Form className="w-full flex flex-col items-center gap-3 text-black">
							<div className="flex flex-row flex-nowrap justify-center gap-2 w-full">
								<div className="flex-[3] min-w-0">
									<CustomInput name="phoneNumber" type="tel">
										شماره تلفن همراه
									</CustomInput>
								</div>
								<div className="flex-[1] min-w-[64px] max-w-[80px]">
									<CustomInput
										name="countryCode"
										readOnly={true}
										icon={Smartphone}
										type="text"
									>
										+98
									</CustomInput>
								</div>
							</div>

							<LoginButton>
								{"بازیابی رمز عبور"}
								<MoveLeft />
							</LoginButton>

							<PhoneVerification
								onlinkClick={() => setOpen(false)}
								onOtpChange={handleOtpChange}
								onclick={() => setOpen(false)}
								open={open}
							/>
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

export default ForgotPassword;
