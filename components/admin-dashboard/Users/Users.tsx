"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Phone, Settings, User, CircleX, Loader2, Check } from "lucide-react";
import styles from "./Users.module.css";
import UserRolesModal from "./UserRoleModal";
import FilterUsers from "./FilterUsers";
import { getData, putData } from "@/src/services/apiHub";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import useHasPermission from "@/src/functions/hasPermission";
type UserType = {
	id: number;
	firstName: string;
	lastName: string;
	phone: string;
	status: "فعال" | "غیر فعال";
};
type Role = {
	id: number;
	name: string;
	permissions: {
		id: number;
		name: string;
		description: string;
		category: string;
	}[];
};

export default function Users() {
	const hasBanUnbanPermission = useHasPermission("user.ban_unban");
	const hasChangeRolePermission = useHasPermission("user.changeRole");
	const [users, setUsers] = useState<UserType[]>([]);
	const [loading, setLoading] = useState(true);

	// const handleManageRoles = useCallback(
	// 	(userId: number, status: "فعال" | "غیر فعال") => {
	// 		setSelectedUserId(userId);
	// 		setSelectedUserStatus(status);
	// 		setIsRolesModalOpen(true);
	// 	},
	// 	[]
	// );

	const fetchAllUsers = useCallback(async () => {
		setLoading(true);
		getData({ endPoint: `/v1/admin/users?statuses=1&statuses=2` })
			.then((data) => {
				setUsers(data.data);
			})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		fetchAllUsers();
	}, []);

	const UserItem = ({
		firstName,
		lastName,
		phone,
		status,
		id,
	}: // onManageRoles,
	UserType) =>
		// & {
		// 	onManageRoles: (id: number, status: "فعال" | "غیر فعال") => void;
		// }
		{
			const [loadingRoles, setLoadingRoles] = useState(false);
			const [isSaving, setIsSaving] = useState(false);
			const [isBanning, setIsBanning] = useState(false);
			const [allRoles, setAllRoles] = useState<Role[]>([]);
			const [userRoles, setUserRoles] = useState<number[]>([]);
			const [open, setOpen] = useState(false);
			const handleRoleChange = (roleId: number) => {
				setUserRoles((prev) =>
					prev.includes(roleId)
						? prev.filter((id) => id !== roleId)
						: [...prev, roleId]
				);
			};
			useEffect(() => {
				getData({ endPoint: `/v1/admin/users/${id}/roles` }).then(
					(data) => {
						setUserRoles(data.data.map((role: Role) => role.id));
					}
				);
				setLoadingRoles(true);
				getData({ endPoint: `/v1/admin/roles` })
					.then((data) => {
						setAllRoles(data.data);
					})
					.finally(() => setLoadingRoles(false));
			}, []);
			const saveRoles = async () => {
				setIsSaving(true);
				const formData = {
					roleIDs: userRoles,
				};
				putData({
					endPoint: `/v1/admin/users/${id}/roles`,
					data: formData,
				})
					.then((data) => {
						CustomToast(data?.message, "success");
						fetchAllUsers();
						setOpen(false);
					})
					.finally(() => setIsSaving(false));
			};
			const handleBanAction = async () => {
				const action = status === "فعال" ? "ban" : "unban";
				setIsBanning(true);
				putData({ endPoint: `/v1/admin/users/${id}/${action}` })
					.then((data) => {
						CustomToast(data?.message, "success");
						// setCurrentUserStatus(
						// 	currentUserStatus === "فعال" ? "غیر فعال" : "فعال"
						// );
						fetchAllUsers();
					})
					.finally(() => setIsBanning(false));
			};
			return (
				<div className="flex flex-row justify-between w-full h-full bg-[#F4F1F3] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-center">
					<div className="flex items-center gap-3 w-1/4">
						<div
							className={`${styles.icon} bg-[#F4F1F3] bg-white text-[#FA682D]`}
						>
							<User className="m-1" />
						</div>
						<p>
							{firstName} {lastName}
						</p>
					</div>
					<div className="flex items-center gap-3 w-1/4">
						<div
							className={`${styles.icon} bg-[#F4F1F3] bg-white text-[#FA682D]`}
						>
							<Phone className="m-1" />
						</div>
						<p>{phone.slice(-10)}</p>
					</div>
					<div className="flex items-center gap-3 w-1/4">
						<div className="flex items-center gap-2">
							<span className="font-bold">
								{status === "فعال" ? "فعال" : "مسدود"}
							</span>
							<div
								className={`h-4 w-4 rounded-full ${
									status === "فعال"
										? "bg-green-500"
										: "bg-red-500"
								} shadow-md`}
							/>
						</div>
					</div>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger>
							<div
								className={`bg-white ${styles.button} text-[#FA682D] flex gap-2 items-center p-2 hover:cursor-pointer`}
							>
								<p className="font-bold">
									جزئیات بیشتر و مدیریت
								</p>
								<Settings />
							</div>
						</DialogTrigger>
						<DialogContent
							className={`sm:max-w-[800px] max-h-[80vh] overflow-y-auto no-scrollbar rtl vazir dialog-width flex flex-col`}
						>
							<div className="relative flex-1 overflow-y-auto no-scrollbar">
								<DialogHeader>
									<DialogTitle className="text-blue-800 text-right">
										مدیریت نقش‌های کاربر
									</DialogTitle>
								</DialogHeader>

								{/* <DialogClose
						className="absolute left-4 top-0 p-1 rounded-sm opacity-70 hover:bg-gray-100 disabled:pointer-events-none"
						disabled={isSaving || isBanning}
					></DialogClose> */}

								{loadingRoles ? (
									<div className="flex justify-center items-center">
										<LoadingSpinner className="w-full h-full" />
										{/* <Loader2 className="animate-spin text-orange-500 h-8 w-8" /> */}
									</div>
								) : (
									<div className="space-y-3 py-4">
										{allRoles.map((role) => (
											<div
												key={role.id}
												className="flex items-center gap-3 p-2"
											>
												<div className="relative">
													<input
														name={`role-${role.id}`}
														type="checkbox"
														disabled={!hasChangeRolePermission}
														defaultChecked={userRoles.includes(
															role.id
														)}
														onChange={() =>
															handleRoleChange(
																role.id
															)
														}
														className={`peer h-5 w-5 ${hasChangeRolePermission ? "cursor-pointer" : "cursor-not-allowed"} transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500 mt-0.5`}
													/>
													<Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " />
												</div>
												{/* <input
													type="checkbox"
													id={`role-${role.id}`}
													checked={userRoles.includes(
														role.id
													)}
													onChange={() =>
														handleRoleChange(
															role.id
														)
													}
													className="w-5 h-5 cursor-pointer text-orange-500 rounded focus:ring-orange-400 border-gray-300"
												/> */}
												<label
													htmlFor={`role-${role.id}`}
													className="text-gray-700 cursor-pointer"
												>
													{role.name}
												</label>
											</div>
										))}
									</div>
								)}
							</div>

							{/* Sticky footer */}
							<div className="sticky bottom-0 bg-white">
								<DialogFooter className="grid grid-cols-2 gap-4 w-full">
									{/* Left-aligned buttons container */}
									<div className="flex justify-start">
										{hasBanUnbanPermission && (
											<Button
												onClick={handleBanAction}
												// disabled={isBanning}
												className={`px-4 py-2 rounded-lg cursor-pointer min-w-32 ${
													status === "فعال"
														? "bg-red-500 hover:bg-red-600"
														: "bg-green-500 hover:bg-green-600"
												}`}
											>
												{isBanning ? (
													<LoadingOnButton />
												) : // <Loader2 className="animate-spin h-4 w-4 ml-2" />
												status === "فعال" ? (
													<p>مسدود کردن</p>
												) : (
													<p>رفع انسداد</p>
												)}
											</Button>
										)}
									</div>

									{/* Right-aligned button container */}
									<div className="flex justify-end gap-2">
										<DialogClose asChild>
											<Button
												variant="outline"
												// disabled={isSaving || isBanning}
												className="bg-gray-300 cursor-pointer"
											>
												انصراف
											</Button>
										</DialogClose>

										<Button
											onClick={saveRoles}
											// disabled={
											// 	isLoading || isSaving || isBanning
											// }
											className="bg-orange-500 cursor-pointer hover:bg-orange-600 min-w-28"
										>
											{isSaving ? (
												<LoadingOnButton />
											) : (
												<p>ذخیره تغییرات</p>
											)}
										</Button>
									</div>
								</DialogFooter>
							</div>
						</DialogContent>
					</Dialog>
					{/* <button
					className={`${styles.button} text-[#FA682D] flex gap-2 items-center p-2 hover:cursor-pointer`}
					onClick={() => onManageRoles(id, normalizedStatus)}
				>
					<p className="font-bold">جزئیات بیشتر و مدیریت</p>
					<Settings />
				</button> */}
				</div>
			);
		};

	// if (loading) {
	// 	return (
	// 		<div className="flex justify-center items-center h-40">
	// 			<LoadingSpinner />
	// 			{/* <Loader2 className="animate-spin text-orange-500" size={32} /> */}
	// 		</div>
	// 	);
	// }

	// const UserItem = ({ firstName, lastName, phone, status, id }: UserType) => {
	//   const normalizedStatus = status === "block" ? "blocked" : status;
	//   return (
	//     <div className="flex flex-row justify-between w-full h-full bg-[#F0EDEF] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-center">
	//       <div className="flex items-center gap-3 w-1/4">
	//         <CustomIcon icon={User} />
	//         <p>
	//           {firstName} {lastName}
	//         </p>
	//       </div>
	//       <div className="flex items-center gap-3 w-1/4">
	//         <CustomIcon icon={Phone} />
	//         <p>{phone.slice(-10)}</p>
	//       </div>
	//       <div className="flex items-center gap-3 w-1/4">
	//         <div className="flex items-center gap-2">
	//           <span className="font-bold">
	//             {status === "فعال" ? "فعال" : "مسدود"}
	//           </span>
	//           <div
	//             className={`h-4 w-4 rounded-full ${
	//               status === "فعال" ? "bg-green-500" : "bg-red-500"
	//             } shadow-md`}
	//           />
	//         </div>
	//       </div>
	//       <button
	//         className={`${styles.button} text-[#FA682D] flex gap-2 items-center p-2 hover:cursor-pointer`}
	//        onClick={() => handleManageRoles(id, normalizedStatus)}
	//       >
	//         <p className="font-bold">جزئیات بیشتر و مدیریت</p>
	//         <Settings />
	//       </button>
	//     </div>
	//   );
	// };
	return (
		<div className="flex flex-col w-full text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
			<FilterUsers onFilteredUsers={setUsers} setLoading={setLoading} />
			{loading ? (
				<div className="flex bg-[#F4F1F3] min-h-[50vh] justify-center items-center h-40">
					<LoadingSpinner />
					{/* <Loader2 className="animate-spin text-orange-500" size={32} /> */}
				</div>
			) : users.length === 0 ? (
				<div className="flex bg-[#F4F1F3] flex-row text-center items-center justify-center">
					<h2 className="text-gray-500 py-5 px-2 text-center">
						کاربری پیدا نشد
					</h2>
					<div className="text-orange-400">
						<CircleX />
					</div>
				</div>
			) : (
				users.map((user) => (
					<UserItem
						key={`user-${user.id}-${user.phone}`}
						id={user.id}
						firstName={user.firstName}
						lastName={user.lastName}
						phone={user.phone}
						status={user.status}
						// onManageRoles={handleManageRoles}
					/>
				))
			)}
			{/* <UserRolesModal
				isOpen={isRolesModalOpen}
				onClose={setIsRolesModalOpen}
				userId={selectedUserId || 0}
				onSaveSuccess={fetchAllUsers}
				userStatus={selectedUserStatus}
			/> */}
		</div>
	);
}
