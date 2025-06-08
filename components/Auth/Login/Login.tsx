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
import { postData } from "../../../src/services/apiHub";
import { setUser } from "@/src/store/slices/userSlice";
import { useDispatch } from "react-redux";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";

const validationSchema = Yup.object({
	phoneNumber: Yup.string()
		.matches(/^[0-9]{10}$/, "شماره تلفن باید ۱۰ رقم باشد")
		.required("شماره تلفن الزامی است"),
	password: Yup.string()
		// .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.")
		// .matches(/[a-z]/, ".رمز عبور باید شامل حداقل یک حرف کوچک باشد")
		// .matches(/[A-Z]/, ".رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
		// .matches(/\d/, ".رمز عبور باید شامل حداقل یک عدد باشد")
		// .matches(/[\W_]/, ".رمز عبور باید شامل حداقل یک نماد باشد")
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
		setLoading(true);
		console.log(localStorage.getItem("user"));
		postData({
			endPoint: "/v1/auth/login",
			data: {
				phone: "+98" + phoneNumber,
				password: password,
			},
		})
			.then((data) => {
				CustomToast(data?.message, "success");
				dispatch(
					setUser({
						firstName: data.data.firstName,
						lastName: data.data.lastName,
						permissions: data.data.permissions,
						accessToken: data.data.accessToken,
						refreshToken: data.data.accessToken,
					})
				);
				window.location.href = "/dashboard";
			})
			.finally(() => setLoading(false));
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
								{loading ? (
									<LoadingOnButton size={28} />
								) : (
									<>
										ورود
										<MoveLeft />
									</>
								)}
							</LoginButton>
						</Form>
					</Formik>

					<p className="flex gap-5 justify-center text-center text-sm text-blue-600">
						<a href="/forgot-password" data-test="forget-password">
							فراموشی رمز عبور
						</a>
						<Link href="/signup">ثبت نام نکرده ام</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
