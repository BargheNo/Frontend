"use client";
import React, { useEffect, useState } from "react";
import {
	ShieldAlert,
	Mailbox,
	SquareMenu,
	MapPinHouse,
	LandPlot,
	CircleDollarSign,
	Gauge,
	BellRing,
	House,
} from "lucide-react";
import style from "./style.module.css";
import SignupButton from "@/components/SignupButton/SignupButton";
import * as Yup from "yup";
import { order } from "@/src/types/OrderrequestType";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import { Form, Formik } from "formik";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { City, Province } from "@/src/types/provinceType";
import orderService from "@/src/services/orderService";
import CustomTextArea from "../Custom/CustomTextArea/CustomTextArea";
import CustomToast from "../Custom/CustomToast/CustomToast";
import AddComponent from "../AddComponent/AddComponent";
import LoadingOnButton from "../Loading/LoadinOnButton/LoadingOnButton";
import { getData } from "@/src/services/apiHub";
export default function Neworder() {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [disable, Setdisable] = useState(true);
	const [provinceid, Setprovinceid] = useState<number>();
	const [provinces, Setprovinces] = useState<Province[]>([]);
	const [cities, Setcities] = useState<City[]>([]);
	const [building, Setbuilding] = useState(1);
	const [cityid, Setcityid] = useState<number>();
	const [buildingTypes, setBuildingTypes] = useState();

	const Getprovinces = () => {
		getData({ endPoint: `/v1/address/province` }).then((data) => {
			Setprovinces(data?.data);
		});
	};
	useEffect(() => {
		Getprovinces();
		getData({ endPoint: `v1/installation/request/building` }).then(
			(data) => {
				console.log(data?.data);
				setBuildingTypes(data?.data);
			}
		);
	}, []);

	const UpdateCityList = (provinceId: number) => {
		getData({
			endPoint: `/v1/address/province/${provinceId}/city`,
		}).then((data) => {
			Setcities(data?.data);
		});
	};
	const Findprovinceid = (provinces: Province[], id: number) => {
		const province = provinces.find((p) => p.ID === id);
		return province?.ID ?? null;
	};

	const FindCityid = (cities: City[], name: string) => {
		const city = cities.find((p) => p.name === name);
		return city?.ID ?? null;
	};

	useEffect(() => {
		UpdateCityList(provinceid ?? 1);
	}, [provinceid]);

	const handelOrderrequest = (orderinfo: order) => {
		setLoading(true);
		orderService.orderRequest(orderinfo).then((res) => {
			console.log(res);
			CustomToast(res?.message, "success");
			setLoading(false);
			setOpen(false);
		});
	};
	// console.log(cityid);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<AddComponent title="ثبت سفارش جدید" />
			</DialogTrigger>
			<DialogContent
				style={{ backgroundColor: "#F1F4FC" }}
				className="w-full sm:min-w-[750px] max-w-xl mx-auto no-scrollbar p-4 overflow-auto py-4 max-h-[90vh] overflow-y-auto"
			>
				<DialogHeader>
					<DialogTitle className="flex justify-center items-end font-bold mt-3.5">
						ثبت سفارش پنل جدید
					</DialogTitle>
				</DialogHeader>
				<Formik
					initialValues={{
						name: "",
						address: "",
						area: "",
						electricity: "",
						buildingType: "",
						cost: "",
						code: "",
						unit: "",
						number: "",
						province: "",
						city: "",
					}}
					validationSchema={Yup.object({
						name: Yup.string()
							.required("این فیلد الزامی است.")
							.max(
								50,
								"نام پنل نمی تواند بیش از 50 کارکتر باشد."
							),
						address: Yup.string().required("این فیلد الزامی است."),
						area: Yup.number().required("این فیلد الزامی است."),
						electricity: Yup.number().required(
							"این فیلد الزامی است."
						),
						cost: Yup.number().required("این فیلد الزامی است."),
						number: Yup.string().required("این فیلد الزامی است."),
						buildingType: Yup.string().required(
							"نوع ساختمان الزامی است"
						),
						code: Yup.string()
							.required("این فیلد الزامی است.")
							.length(10, "کد پستی وارد شده اشتباه است."),
						unit: Yup.number().required("این فیلد الزامی است."),
						province: Yup.string().required("این فیلد الزامی است."),
						city: Yup.string().required("این فیلد الزامی است."),
					})}
					onSubmit={(values) => {
						// setOpen(false);
						handelOrderrequest({
							name: values.name,
							area: Number(values.area),
							power: Number(values.electricity),
							maxCost: Number(values.cost),
							buildingType: Number(building),
							description: "",
							provinceID: provinceid ?? 1,
							cityID: cityid ?? 1,
							streetAddress: values.address,
							postalCode: String(values.code),
							houseNumber: String(values.number),
							unit: Number(values.unit),
						});
					}}
				>
					{({ setFieldValue, values }) => (
						<Form className="flex flex-col items-end w-full h-auto gap-4 rtl">
							<div
								className="flex md:flex-row flex-col justify-end w-full items-center"
								style={{ gap: "1vw" }}
							>
								<CustomInput
									dir="rtl"
									// style={{ width: "25vw" }}
									placeholder="نام پنل"
									icon={SquareMenu}
									name="name"
								>
									{" "}
								</CustomInput>
								<div className="flex flex-row justify-center mt-5 gap-x-1 text-gray-500 w-full">
									<ShieldAlert />
									<p className="rtl whitespace-nowrap">
										پنل شما با این نام در بخش پنل‌ها ثبت
										خواهد شد.
									</p>
								</div>
							</div>

							<div
								className={`${style.citypro} flex md:flex-row flex-col justify-between w-full mt-2`}
							>
								<Select
									name="province"
									onValueChange={(value) => {
										Setdisable(false);
										setFieldValue("province", value);
										setFieldValue("city", "");
										const id = Findprovinceid(
											provinces,
											Number(value)
										);
										console.log("id found in province", id);
										Setprovinceid(id ?? 1);
										if (id) UpdateCityList(id);
									}}
								>
									<SelectTrigger
										className={`${style.CustomInput} cursor-pointer`}
										id="province"
										// style={{ width: "25vw" }}
									>
										<SelectValue placeholder="استان" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>استان</SelectLabel>
											{provinces?.length > 0 ? (
												provinces.map(
													(provincearr, index) => (
														<SelectItem
															id={String(index)}
															key={index}
															className="cursor-pointer"
															value={String(
																provincearr.ID
															)}
														>
															{provincearr.name}
														</SelectItem>
													)
												)
											) : (
												<p>هیچ استانی یافت نشد</p>
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
								<Select
									name="city"
									disabled={disable}
									onValueChange={(value) => {
										const iD = FindCityid(cities, value);
										Setcityid(iD ?? 1);
										setFieldValue("city", value);
									}}
								>
									<SelectTrigger
										disabled={disable}
										className={`${style.CustomInput} cursor-pointer`}
										id="city"
										// style={{ width: "25vw" }}
									>
										<SelectValue placeholder="شهر" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>شهر</SelectLabel>
											{cities?.length > 0 ? (
												cities.map((city, index) => (
													<SelectItem
														key={index}
														value={city.name}
														className="cursor-pointer"
														id={String(index)}
													>
														{Object.values(
															city.name
														)}
													</SelectItem>
												))
											) : (
												<p>هیچ شهری یافت نشد</p>
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="-mt-5 w-full">
								<CustomTextArea
									icon={MapPinHouse}
									name="address"
									id="address"
									placeholder="آدرس"
								>
									{" "}
								</CustomTextArea>
							</div>
							<div
								className="flex md:flex-row flex-col justify-end w-full -mt-4"
								style={{ gap: "1vw" }}
							>
								<CustomInput
									type="number"
									// style={{ width: "25vw" }}
									dir="rtl"
									icon={Mailbox}
									name="code"
									placeholder="کد پستی"
								>
									{" "}
								</CustomInput>
								<CustomInput
									type="number"
									style={{ width: "12vw" }}
									dir="rtl"
									icon={House}
									placeholder="پلاک"
									name="number"
								>
									{" "}
								</CustomInput>
								<CustomInput
									type="number"
									style={{ width: "12vw" }}
									dir="rtl"
									icon={BellRing}
									placeholder="واحد"
									name="unit"
								>
									{" "}
								</CustomInput>
							</div>

							<div className="flex w-full gap-x-1 text-gray-500 -mb-6 mt-2">
								<ShieldAlert />
								<p>مکانی که برای نصب پنل در نظر دارید.</p>
							</div>

							<div
								className="grid grid-cols-2 grid-rows-3 h-52 gap-x-3 w-full items-center -mt-2"
								// style={{ gap: "1vw" }}
							>
								<CustomInput
									type="number"
									dir="rtl"
									// style={{ width: "25vw" }}
									placeholder="مساحت(مترمربع)"
									icon={LandPlot}
									name="area"
								>
									{" "}
								</CustomInput>
								<div className="flex flex-row gap-x-1 text-gray-500 mt-6 w-full">
									<ShieldAlert />
									<p>مساحت محل نصب پنل (متر مربع)</p>
								</div>
								<CustomInput
									type="number"
									dir="rtl"
									// style={{ width: "25vw" }}
									placeholder="میزان برق مورد نیاز(کیلووات)"
									icon={Gauge}
									name="electricity"
								>
									{" "}
								</CustomInput>
								<div className="flex flex-row gap-x-1 text-gray-500 mt-6 w-full">
									<ShieldAlert />
									<p className="">میزان برق مورد نیاز </p>
								</div>

								<CustomInput
									type="number"
									dir="rtl"
									placeholder="سقف هزینه(ریال)"
									icon={CircleDollarSign}
									name="cost"
								>
									{" "}
								</CustomInput>

								<Select
									name="buildingType"
									onValueChange={(value) => {
										setFieldValue("buildingType", value);
										Setbuilding(Number(value));
									}}
								>
									<SelectTrigger
										value={values.buildingType}
										onChange={(value) => {
											setFieldValue(
												"buildingType",
												value
											);
										}}
										className={`${style.CustomInput} mt-[27px] min-h-[43px] cursor-pointer`}
									>
										<SelectValue placeholder="نوع ساختمان" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>
												نوع ساختمان
											</SelectLabel>
											{buildingTypes?.map(
												(buildingType, index) => (
													<SelectItem
														key={index}
														className="cursor-pointer"
														value={String(buildingType?.id)}
													>
														{buildingType?.name}
													</SelectItem>
												)
											)}
											{/* <SelectItem
												id="0"
												className="cursor-pointer"
												value="1"
											>
												مسکونی
											</SelectItem>
											<SelectItem
												id="1"
												className="cursor-pointer"
												value="2"
											>
												تجاری
											</SelectItem>
											<SelectItem
												id="2"
												className="cursor-pointer"
												value="3"
											>
												صنعتی
											</SelectItem>
											<SelectItem
												id="3"
												className="cursor-pointer"
												value="4"
											>
												کشاورزی
											</SelectItem>
											<SelectItem
												id="4"
												value="5"
												className="cursor-pointer"
											>
												سایر
											</SelectItem> */}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>

							<div className="flex flex-row w-80 font-bold justify-center items-center self-center">
								<SignupButton
									className="text-[#FA682D]"
									id="newOrderBtn"
									type="submit"
									style={{
										marginTop: "10px",
									}}
								>
									{loading ? (
										<LoadingOnButton size={24} />
									) : (
										<p>ثبت سفارش</p>
									)}
								</SignupButton>
							</div>
							<DialogFooter>
								<DialogClose />
							</DialogFooter>
						</Form>
					)}
				</Formik>
			</DialogContent>
		</Dialog>
	);
}
