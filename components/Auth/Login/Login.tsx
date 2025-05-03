"use client";
import { useEffect, useState } from "react";
import { MoveLeft, Lock, Unlock, Smartphone } from "lucide-react";
import Link from "next/link";
import styles from "./login.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../Custom/CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";
import LoginButton from "./LoginButton";
import { baseURL, postData } from "../../../src/services/apiHub";
import { toast } from "sonner";
import { setUser } from "@/src/store/slices/userSlice";
import { useDispatch } from "react-redux";
import generateErrorMessage from "@/src/functions/handleAPIErrors";

const validationSchema = Yup.object({
	phoneNumber: Yup.string()
		.matches(/^[0-9]{10}$/, "شماره تلفن باید ۱۰ رقم باشد")
		.required("شماره تلفن الزامی است"),
	password: Yup.string()
		.min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.")
		.matches(/[a-z]/, ".رمز عبور باید شامل حداقل یک حرف کوچک باشد")
		.matches(/[A-Z]/, ".رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
		.matches(/\d/, ".رمز عبور باید شامل حداقل یک عدد باشد")
		.matches(/[\W_]/, ".رمز عبور باید شامل حداقل یک نماد باشد")
		.required("رمز عبور الزامی است"),
});

const initialValues = {
	phoneNumber: "",
	password: "",
};

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	useEffect(() => {
		console.log(localStorage.getItem("user"));
	}, []);
	const dispatch = useDispatch();
	const handleFormSubmit = async (values: {
		phoneNumber: string;
		password: string;
	}) => {
		const { phoneNumber, password } = values;

		try {
			console.log(localStorage.getItem("user"));
			const response = await postData({
				endPoint: "/v1/auth/login",
				data: {
					phone: "+98" + phoneNumber,
					password: password,
				},
			});

			if (response?.statusCode === 200) {
				toast(<div id="sonner-toast">{response?.message}</div>);
				// toast.success(response?.message);
				dispatch(
					setUser({
						firstName: response.data.firstName,
						lastName: response.data.lastName,
						accessToken: response.data.accessToken,
						refreshToken: response.data.accessToken,
					})
				);
				window.location.href = "/dashboard";
			}
		} catch (error: any) {
			// toast.error(
			// 	generateErrorMessage(error) || "هنگام ورود مشکلی پیش آمد."
			// );
			toast(
				<div id="sonner-toast">
					{generateErrorMessage(error) || "هنگام ورود مشکلی پیش آمد."}
				</div>
			);
		}
	};

	return (
		<div className={`${vazir.className} w-full`}>
			<div dir="rtl" className={`${styles.mainbg} w-full`}>
				<div className="w-full max-w-md p-6 space-y-4 shadow-2xl rounded-2xl bg-[#f1f4fc]">
					<h2 className="text-3xl text-black text-center">
						{"ورود"}
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
										// value="+98"
									>
										98+
									</CustomInput>
								</div>
							</div>
							<div className="w-full">
								<CustomInput
									name="password"
									icon={showPassword ? Unlock : Lock}
									type={showPassword ? "text" : "password"}
									onIconClick={() =>
										togglePasswordVisibility()
									}
								>
									رمز عبور
								</CustomInput>
							</div>
							<LoginButton>
								ورود
								<MoveLeft />
							</LoginButton>
						</Form>
					</Formik>

					<p className="flex gap-5 justify-center text-center text-sm text-blue-600">
						<a href="/forgot-password" data-test="forget-password">فراموشی رمز عبور</a>
						<Link href="/signup">ثبت نام نکرده ام</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
