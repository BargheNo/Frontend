"use client";

import { Save, Settings } from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import style from "./style.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SignupButton from "../SignupButton/SignupButton";
import { Switch } from "@/components/ui/switch";
import {
	notificationSetting,
	notifType,
	Notification,
} from "@/src/types/notificationTypes";
import notificationService from "@/src/services/notificationService";
import CustomToast from "../Custom/CustomToast/CustomToast";
import Header from "../Header/Header";
import NotificationBox from "./Notfication/NotificationBox/NotificationBox";
import NotificationHeader from "./Notfication/NotificationHeader/NotificationHeader";
import NotificationContent from "./Notfication/NotificationContent/NotificationContent";

export default function CorpMessagesPagination() {
	const [loading, setLoading] = useState(true);
	const [loading2, setLoading2] = useState(true);
	const [currpage, Setcurrpage] = useState<string>("1");
	const [notifTypes, setNotifTypes] = useState<notifType[]>([]);
	const [notifSetting, setNotifSetting] = useState<notificationSetting[]>([]);
	const [disable, setDisable] = useState(true);
	const [notifId, setNotifId] = useState<number[]>([1, 2, 3, 4]);
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [nameFields, setNameFields] = useState<
		{
			id: number;
			name: string;
			isPushEnabled: boolean;
			isEmailEnabled: boolean;
		}[]
	>([]);

	useEffect(() => {
		setLoading(true);
		notificationService
			.getNotificationType()
			.then((res) => {
				setNotifTypes(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.message);
				setLoading(false);
			});
		notificationService
			.getNotificationSetting()
			.then((res) => setNotifSetting(res.data))
			.catch((err) => console.log(err.message));
	}, []);

	useEffect(() => {
		notificationService
			.getNotificationFielter(notifId, {
				page: currpage,
				pageSize: "4",
			})
			.then((res) => {setNotifications(res.data);setLoading2(false)})
			.catch(()=>setLoading2(false));
	}, [notifId, currpage]);

	useEffect(() => {
		if (notifSetting && notifSetting.length > 0) {
			const values = notifSetting.map((item) => ({
				id: item.id,
				name: item.notificationType.name,
				isPushEnabled: item.isPushEnabled,
				isEmailEnabled: item.isEmailEnabled,
			}));
			setNameFields(values);
		}
	}, [notifSetting]);

	return (
		<>
			<Header className="rtl" header="تنظیمات اعلان‌ها" />
			<div className="flex flex-col text-white bg-transparent w-full">
				<div className="flex flex-col bg-[#F0EDEF] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] mb-5">
					<div className="flex flex-row mr-auto md:ml-30 m-auto md:gap-17 gap-6">
						<p className="mt-8 whitespace-nowrap">دریافت از طریق وبسایت
							
						</p>
						<p className="mt-8 whitespace-nowrap">
							دریافت از طریق ایمیل
							</p>
					</div>
					<div className="flex flex-col text-gray-800 rounded-2xl w-90/100 overflow-auto shadow-[inset_-6px_-6px_16px_rgba(255,255,255,0.8),inset_6px_6px_16px_rgba(0,0,0,0.2)] mt-6 m-auto md:h-65 h-60">
						{notifSetting.length <= 0 && loading ? (
							<div className="flex flex-1 items-center justify-center h-full">
								<LoadingSpinner />
							</div>
						) : (
							notifSetting.map((item, index) => (
								<div
									key={index}
									className="flex flex-row justify-between border-t-2 border-gray-300 h-1/3 items-center px-4"
								>
									<p className="text-gray-600 whitespace-nowrap md:mb-0 mb-9">
										{item.notificationType.name}
									</p>

									<div className="flex flex-col">
										<div className="flex flex-row md:gap-37 gap-17 md:mt-0 mt-9 md:ml-23">
											<Switch
												className="rtl"
												onClick={() =>
													setNameFields((prev) =>
														prev.map((Item) =>
															Item.name === 
												item
												.notificationType
												.name
																? {
																		...Item,
																		isPushEnabled: 
																		!Item.isPushEnabled,
																  }
																: Item
														)
													)
												}
												disabled={disable}
												checked={
													nameFields.find(
														(Item) =>
															Item.name ===
														 item
														 .notificationType
														 .name
													)?.isPushEnabled
												}
											/>
											<Switch
												className="rtl"
												onClick={() =>
													setNameFields((prev) =>
														prev.map((Item) =>
															Item.name ===
												 item
												 .notificationType
												 .name
																? {
																		...Item,
																		isEmailEnabled: 
																		!Item.isEmailEnabled,
																  }
																: Item
														)
													)
												}
												disabled={
													item.notificationType
													.supportsEmail === 
													false
														? true
														: disable
												}
												checked={
													nameFields.find(
														(Item) =>
															Item.name === 
														item
														.notificationType
														.name
													)?.isEmailEnabled
												}
											/>
										</div>
									</div>
								</div>
							))
						)}
					</div>
					<div className="md:w-3/10 w-6/10 mr-auto ml-auto mb-5">
						<SignupButton
							onClick={async () => {
								if (!disable) {
									try {
										const responses = await Promise.all(
											nameFields.map((item) =>
												notificationService.changeNotificationSetting(
													item.id, 
													{
													isPushEnabled: item.isPushEnabled,
													isEmailEnabled: item.isEmailEnabled,
												})
											)
										);
										const successMessage = 
										responses[responses.length - 1]
										?.message;
										CustomToast(
											successMessage,
											 "success"
											);
									} catch (error) {
										CustomToast(
											"خطا در ذخیره‌سازی تنظیمات", 
											"error"
										);

										console.error(error);
									}
								}
								setDisable(!disable);
							}}
							className="bg-[#FA682D]  text-white"
						>
							{disable ? "تنظیمات اعلان ها" : "ذخیرۀ تغییرات"}
							{disable ? <Settings /> : <Save />}
						</SignupButton>
					</div>
				</div>
			</div>

			<Header className="rtl" header="اعلان‌ها" />
			<div className="flex flex-col text-white bg-transparent w-full">

						<div className="flex flex-col bg-[#F0EDEF] text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)] h-20 mb-5">
							<div
								className={`${style.citypro} flex flex-row mr-4 justify-between m-auto md:w-2/10 w-5/10 `}
							>
								<Select
									name="notiftype"
									onValueChange={(value) => {
										if (value === "همه پیام ها") {
											setNotifId([1, 2, 3, 4]);
										} else {
											setNotifId([
												Object.fromEntries(
													notifTypes.map((item) => [item.name, item.id])
												)[value],
											]);
										}
									}}
								>
									<SelectTrigger className={`${style.CustomInput} cursor-pointer`}>
										<SelectValue placeholder="دسته بندی اعلان‌ها" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>اعلان‌ها</SelectLabel>
											<SelectItem value="همه پیام ها">همه پیام ها</SelectItem>
											{notifTypes.map((item, index) => (
												<SelectItem
													value={item?.name}
													key={index}
													className="cursor-pointer"
												>
													{item?.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>
						{loading2 ? (
				<div className="flex justify-center mt-6">
					<LoadingSpinner />
				</div>
			) : notifications && notifications.length > 0 ? (
					<>

						<div className="flex flex-col text-gray-800 w-full rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
							{notifications.map((item, index) => (
								<NotificationBox
									key={index}
									typeid={item.type.id}
									notificationContent={item}
									date="1404-2-2"
								>
									<NotificationHeader
										topic={item?.type?.description}
										title={item?.data?.description}
									/>
									<NotificationContent />
								</NotificationBox>
							))}
						</div>

						<div className="flex justify-center w-full p-5 rtl mt-5">
							<Pagination className="lg:mb-0 mb-20 ">
								<PaginationContent>
									<PaginationItem>
										{Number(currpage) > 1 && (
											<PaginationPrevious
												href="#"
												onClick={() =>
													Setcurrpage((prev) =>
														String(
															Math.max(Number(prev) - 1, 1)
														)
													)
												}
											/>
										)}
									</PaginationItem>
									{["1", "2", "3"].map((page) => (
										<PaginationItem key={page}>
											<PaginationLink
												href="#"
												onClick={() => Setcurrpage(page)}
												isActive={page === currpage}
											>
												{page}
											</PaginationLink>
										</PaginationItem>
									))}
									<PaginationItem>
										{currpage !== "3" && <PaginationEllipsis />}
									</PaginationItem>
									<PaginationItem>
										{currpage !== "3" && (
											<PaginationNext
												href="#"
												onClick={() =>
													Setcurrpage((prev) => 
														String(Number(prev) + 1)
											)
												}
											/>
										)}
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</>
				) : (
					<div className="text-center place-items-center mt-6">
						<div className="-mt-8">
							<p
								className="mt-6 text-navy-blue font-bold rtl"
								style={{ fontSize: "1.1rem" }}
							>
								هیچ سفارشی یافت نشد.
							</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
