"use client";
import { useEffect, useState } from "react";
import CustomInput from "@/components/CustomInput/CustomInput";
import { vazir } from "@/lib/fonts";
import SignupButton from "@/components/SignupButton/SignupButton";
import PhoneVerification from "@/components/phoneVerification/phoneVerification";
import styles from "./signup.module.css";
import { Building2, IdCard } from "lucide-react";

import {
	MoveLeft,
	Smartphone,
	Lock,
	User,
	Unlock,
	Check,
	ArrowLeft,
	ArrowRight,
} from "lucide-react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import registerService from "@/src/services/registerService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import useClientCheck from "@/src/hooks/useClientCheck";

function Signup() {
	const validationSchema = Yup.object({
		firstname: Yup.string().required("نام الزامی است."),
		lastname: Yup.string().required("نام خانوادگی الزامی است."),
		phonenumber: Yup.string()
			.matches(/^(9\d{9})$/, ".شماره تلفن وارد شده اشتباه است")
			.required(".شماره تلفن الزامی است"),
		password: Yup.string()
			.min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.")
			.matches(/[a-z]/, ".رمز عبور باید شامل حداقل یک حرف کوچک باشد")
			.matches(/[A-Z]/, ".رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
			.matches(/\d/, ".رمز عبور باید شامل حداقل یک عدد باشد")
			.matches(/[\W_]/, ".رمز عبور باید شامل حداقل یک نماد باشد")
			.required(".رمز عبور الزامی است"),
		confirmpassword: Yup.string()
			.oneOf(
				[Yup.ref("password")],
				".تأیید رمز عبور باید با رمز عبور مطابقت داشته باشد"
			)
			.required(".تأیید رمز عبور الزامی است"),
	});

	const validationCorpSchema = Yup.object({
		corpname: Yup.string().required(".نام شرکت الزامی است"),
		cin: Yup.string()
			.matches(/^(\d{11})$/, ".شناسه ملی وارد شده اشتباه است")
			.required(".شناسه ملی الزامی است"),
		password: Yup.string()
			.min(8, "رمز عبور باید حداقل 8 کاراکتر باشد.")
			.matches(/[a-z]/, ".رمز عبور باید شامل حداقل یک حرف کوچک باشد")
			.matches(/[A-Z]/, ".رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
			.matches(/\d/, ".رمز عبور باید شامل حداقل یک عدد باشد")
			.matches(/[\W_]/, ".رمز عبور باید شامل حداقل یک نماد باشد")
			.required(".رمز عبور الزامی است"),
		confirmpassword: Yup.string()
			.oneOf(
				[Yup.ref("password")],
				".تأیید رمز عبور باید با رمز عبور مطابقت داشته باشد"
			)
			.required(".تأیید رمز عبور الزامی است"),
	});

	const [check, Setcheck] = useState(false);
	const [hidepass, Sethidepass] = useState(true);
	const [open, setOpen] = useState(false);
	const [hideconfpass, Sethideconfpass] = useState(true);
	const [otpCode, setOtpCode] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [customer, setCustomer] = useState<boolean>(true);
	const route = useRouter();
	const handleOtpChange = (otp: string) => {
		setOtpCode(otp);
	};

	const handelRegister = (
		name: string,
		Lname: string,
		phone: string,
		password: string,
		confirmPassword : string,
		isAcceptTerms: boolean
	) => {
		registerService
			.createUser({
				FirstName: name,
				LastName: Lname,
				Phone: phone,
				Password: password,
				ConfirmPassword: confirmPassword,
				acceptedTerms: isAcceptTerms,
			})
			.then((res) => {
				setOpen(true);
				toast(res.data.message);
			})
			.catch((err) => {
				toast(err.response.data.messages.phone["alreadyRegistered"]);
			});
	};
	const handleCorpRegister = (
		corpname: string,
		cin: string,
		password: string,
		isAcceptTerms: boolean
	) => {
        console.log(`Form: ${corpname}, ${cin}, ${password}, ${isAcceptTerms}`)
		registerService
			.createCorp({
				name: corpname,
				cin: String(cin),
				password: password,
				acceptedTerms: isAcceptTerms
			})
			.then((res) => {
				console.log(res);
				toast(res?.message);
				route.push("/");
			})
			.catch((err) => {
				console.log(err?.response?.data?.message);
				toast(`${err.messages?.name ?? ""}\n${err.messages?.cin?.alreadyRegistered ?? ""}\n${err.messages?.password ?? ""}\n${err.messages?.acceptedTerms ?? ""}`);
			});
	};

	const handleVerification = (phone: string, otp: string) => {
		registerService
			.phonenumberVerification({ phone: phone, otp: otp })
			.then((res) => {
				route.push("/login");
				toast(res.data.message);
			})
			.catch((err) =>
				toast(err.response.data.messages.otp["invalidOTP"])
			);
	};

	useEffect(() => {
		if (otpCode.length === 6) {
			handleVerification(phone, otpCode);
		}
	}, [otpCode]);
	return (
		<div className={`grid grid-cols-2 overflow-hidden gap-[50vw]`}>
			{/* Customer */}
			<div className={`${vazir.className}`}>
				<div className={`${styles.wholePage} overflow-hidden`}>
					<div
						className={`absolute overflow-hidden -translate-x-[50vw] hover:cursor-pointer w-48 h-48 justify-center grid grid-cols-2 grid-rows-2 text-center items-center bg-gradient-to-r from-[#EB4132] to-[#DD392B] rounded-full p-6`}
						onClick={() => setCustomer(!customer)}
					>
						<ArrowRight
							className={`transition duration-${
								customer ? "300" : "1000"
							} w-12 h-12 translate-y-1 ${
								!customer ? "translate-x-22" : "translate-x-4"
							}`}
						/>
						<ArrowLeft
							className={`transition duration-${
								!customer ? "300" : "1000"
							} w-12 h-12 translate-y-1 ${
								customer ? "translate-x-3" : "-translate-x-18"
							}`}
						/>
						<span
							className={`${
								customer ? "" : "translate-x-18"
							} transition duration-${
								customer ? "300" : "1000"
							} -translate-y-1 text-md w-20`}
						>
							ثبت نام مشتری
						</span>
						<span
							className={`${
								customer ? "" : "-translate-x-22"
							} transition duration-${
								!customer ? "300" : "1000"
							} -translate-y-1 text-md w-20`}
						>
							ثبت نام شرکت
						</span>
					</div>
					<div className={styles.card}>
						{customer && (
							<div className="w-full items-center text-center">
								<h1 className={styles.topic}>ثبت نام</h1>
								<Formik
									initialValues={{
										firstname: "",
										lastname: "",
										phonenumber: "",
										password: "",
										confirmpassword: "",
									}}
									validationSchema={validationSchema}
									onSubmit={(values) => {
										handelRegister(
											values.firstname,
											values.lastname,
											"+98" + values.phonenumber,
											values.password,
											values.confirmpassword,
											check
										);
										setPhone("+98" + values.phonenumber);
									}}
								>
									<Form className={styles.form}>
										<div
											className="flex flex-row gap-3 justify-center w-9/10"
											dir="rtl"
										>
											<CustomInput
												placeholder="نام"
												name="firstname"
												icon={User}
												type="text"
												autoFocus={true}
											>
												{" "}
											</CustomInput>
											<CustomInput
												name="lastname"
												icon={User}
												type="text"
												placeholder="نام خانوادگی"
											>
												{" "}
											</CustomInput>
										</div>
										<div className="flex flex-row justify-center w-9/10 gap-2">
											<div className="w-1/4">
												<CustomInput
													name="countrycode"
													readOnly={true}
													placeholder="+98"
													icon={Smartphone}
													type="number"
												>
													{" "}
												</CustomInput>
											</div>
											<div className="w-3/4">
											<CustomInput
												name="phonenumber"
												placeholder="شماره تلفن همراه"
												type="number"
											>
												{" "}
											</CustomInput>
											</div>
										</div>
										<div className="w-9/10">
										<CustomInput
											name="password"
											placeholder="رمز عبور"
											onIconClick={() =>
												Sethidepass((prev) => !prev)
											}
											icon={hidepass ? Lock : Unlock}
											type={
												hidepass ? "password" : "text"
											}
										>
											{" "}
										</CustomInput>
										<CustomInput
											name="confirmpassword"
											onIconClick={() =>
												Sethideconfpass((prev) => !prev)
											}
											icon={hideconfpass ? Lock : Unlock}
											type={
												hideconfpass
													? "password"
													: "text"
											}
											placeholder="تایید رمز عبور"
										>
											{" "}
										</CustomInput>
										</div>
										<div className={styles.ruleText}>
											<label
												htmlFor="link-checkbox"
												className="flex gap-1"
											>
												.را می پذیرم
												<a
													href="#"
													className={styles.link}
												>
													قوانین و مقررات
												</a>
											</label>
											<div className="relative">
												<input
													id="link-checkbox"
													onClick={() =>
														Setcheck(
															(prev) => !prev
														)
													}
													type="checkbox"
													value=""
													className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500 mt-0.5"
												/>
												<Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " />
											</div>
										</div>
										<div
											style={{
												width: "90%",
												fontSize: "1.25rem",
												fontWeight: "600",
											}}
										>
											<SignupButton
												type="submit"
												disabled={!check}
											>
												<div
													className={
														styles.leftIconButton
													}
												>
													<MoveLeft></MoveLeft>
													<p>ثبت نام</p>
												</div>
											</SignupButton>
										</div>

										<PhoneVerification
											onlinkClick={() => setOpen(false)}
											onOtpChange={handleOtpChange}
											onclick={() => setOpen(false)}
											open={open}
										></PhoneVerification>
										<div className={styles.loginText}>
											<a
												href="./login"
												className={styles.link}
											>
												ورود به حساب
											</a>
											<p>!قبلا حساب ساخته ام</p>
										</div>
									</Form>
								</Formik>
							</div>
						)}
						{!customer && (
							<div className="w-full items-center text-center">
								<h1 className={styles.topic}>ثبت نام شرکت</h1>
								<Formik
									initialValues={{
										corpname: "",
										cin: "",
										password: "",
										confirmpassword: "",
									}}
									validationSchema={validationCorpSchema}
									onSubmit={(values) => {
										handleCorpRegister(
											values.corpname,
											values.cin,
											values.password,
											check
										);
									}}
								>
									<Form className={styles.form}>
										<div className="w-9/10">
										<CustomInput
											placeholder="نام شرکت"
											name="corpname"
											icon={Building2}
											type="text"
										>
											{" "}
										</CustomInput>
										<CustomInput
											name="cin"
											placeholder="شناسه ملی"
											icon={IdCard}
											type="number"
										>
											{" "}
										</CustomInput>
										<CustomInput
											name="password"
											placeholder="رمز عبور"
											onIconClick={() =>
												Sethidepass((prev) => !prev)
											}
											icon={hidepass ? Lock : Unlock}
											type={
												hidepass ? "password" : "text"
											}
										>
											{" "}
										</CustomInput>
										<CustomInput
											name="confirmpassword"
											onIconClick={() =>
												Sethideconfpass((prev) => !prev)
											}
											icon={hideconfpass ? Lock : Unlock}
											type={
												hideconfpass
													? "password"
													: "text"
											}
											placeholder="تایید رمز عبور"
										>
											{" "}
										</CustomInput>
										</div>
										<div className={styles.ruleText}>
											<label
												htmlFor="link-checkbox"
												className="flex gap-1"
											>
												.را می پذیرم
												<a
													href="#"
													className={styles.link}
												>
													قوانین و مقررات
												</a>
											</label>
											<div className="relative">
												<input
													id="link-checkbox"
													onClick={() =>
														Setcheck(
															(prev) => !prev
														)
													}
													type="checkbox"
													value=""
													className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500 mt-0.5"
												/>
												<Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " />
											</div>
										</div>
										<div
											style={{
												width: "90%",
												fontSize: "1.25rem",
												fontWeight: "600",
											}}
										>
											<SignupButton
												type="submit"
												disabled={!check}
											>
												<div
													className={
														styles.leftIconButton
													}
												>
													<MoveLeft></MoveLeft>
													<p>ثبت نام</p>
												</div>
											</SignupButton>
										</div>

										<PhoneVerification
											onlinkClick={() => setOpen(false)}
											onOtpChange={handleOtpChange}
											onclick={() => setOpen(false)}
											open={open}
										></PhoneVerification>
										<div className={styles.loginText}>
											<a
												href="./login"
												className={styles.link}
											>
												ورود به حساب
											</a>
											<p>!قبلا حساب ساخته ام</p>
										</div>
									</Form>
								</Formik>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Signup;
