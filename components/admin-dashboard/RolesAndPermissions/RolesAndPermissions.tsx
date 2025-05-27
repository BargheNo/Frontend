"use client";
import React from "react";
import styles from "./RolesAndPermissions.module.css";
import { User, SquareCheckBig, Trash2, Pencil, Plus, Dot } from "lucide-react";
import { useSelector } from "react-redux";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import EditRoleModal from "./EditRoleModal";
import CreateRoleModal from "./CreateRoleModal";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import AddComponent from "@/components/AddComponent/AddComponent";
import Header from "@/components/Header/Header";
import { Badge } from "@/components/ui/badge";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";

const RolesAndPermissions = () => {
	type Permission = {
		id: number;
		name: string;
		description: string;
		category: string;
	};
	type Role = {
		id: string;
		name: string;
		permissions: Permission[];
	};

	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const [roles, setRoles] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentRole, setCurrentRole] = useState<Role | null>(null);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	const getRoles = () => {
		fetch("http://46.249.99.69:8080/v1/admin/roles", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setRoles(data.data);
				setLoading(false);
			})
			.catch((err) => {
				const errMsg =
					generateErrorMessage(err) ||
					"مشکلی در دریافت نقش ها رخ داد.";
				// toast.error(errMsg);
				CustomToast(errMsg, "error");
				setLoading(false);
			});
	};
	const deleteRole = async (roleToDeleteId: string) => {
		setDeletingId(roleToDeleteId);
		try {
			const response = await fetch(
				`http://46.249.99.69:8080/v1/admin/roles/${roleToDeleteId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to resolve ticket");
			}

			const result = await response.json();
			// toast.success(result.message);
			CustomToast(result?.message, "success");
			getRoles();
			setDeletingId(null);

			// Optionally refresh ticket list or update UI
		} catch (error: any) {
			const errMsg =
				generateErrorMessage(error) || "هنگام حذف نقش مشکلی پیش آمد.";
			// toast.error(errMsg);
			CustomToast(errMsg, "error");
			setDeletingId(null);
		}
	};

	const openEditModal = (role: Role) => {
		setCurrentRole(role);
		setIsModalOpen(true);
	};

	useEffect(() => {
		getRoles();
	}, []);

	return (
		<>
			<CreateRoleModal onSaveSuccess={getRoles} />
			<Header header="نقش‌های فعلی" />
			<div className="flex flex-col bg-[#F0EDEF] text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
				{loading ? (
					<LoadingSpinner />
				) : roles.length > 0 ? (
					roles.map((role, index) => (
						<div
							key={index}
							className={`w-full border-t-1 border-gray-300 first:border-t-0`}
							// className={`bg-white p-4 rounded-xl w-full shadow-sm flex items-center gap-3 rtl ${styles.shadow}`}
						>
							<div key={index} className="flex flex-col rtl justify-between content-center h-full gap-5 py-5 px-5 overflow-hidden relative border-t-1 border-gray-300 w-full first:border-t-0 min-h-[20px]">
								<div className="flex flex-col gap-4">
									<div className="flex flex-row gap-2">
										<div className="text-orange-500">
											<User />
										</div>
										<p className="text-start content-start  text-xl ">
											{role.name}
										</p>
									</div>
									<div className="flex flex-row gap-2">
										<div className="text-orange-500">
											<SquareCheckBig />
										</div>
										<div
											className="content-start w-full flex gap-2 text-xl"
											dir="rtl"
										>
											<p>دسترسی‌ها:</p>
											{role.permissions.length === 0 ? (
												<p>دسترسی موجود نیست</p>
											) : (
												role.permissions.map(
													(permission, index) =>
														index < 5 && (
															<div
																className="flex flex-row"
																key={index}
															>
																{/* <Dot /> */}
																<Badge className="bg-fire-orange">
																	{
																		permission.description
																	}
																</Badge>
																{/* <span>
														{permission.description}
													</span> */}
															</div>
														)
												)
											)}
											{role.permissions.length >= 5 && (
												<Badge className="bg-fire-orange">
													...
												</Badge>
											)}
										</div>
									</div>
								</div>
								<div
									className="flex flex-row w-full h-full px-4 gap-4 rtl justify-end"
									key={index}
								>
									<button
										className={`cta-neu-button cursor-pointer w-1/8 flex flex-row ${styles.button} items-center content-center justify-center h-1/2 w-1/2`}
										// onClick={() =>
										// 	openEditModal({
										// 		role.id,
										// 		name,
										// 		role.permissions,
										// 	})
										// }
									>
										<p>تغییر</p>
										<Pencil className="text-orange-500" />
									</button>
									<button
										className={`cta-neu-button flex cursor-pointer w-1/8 ${styles.button} items-center content-center justify-center h-1/2 w-1/2 cursor-pointer`}
										onClick={() => deleteRole(role.id)}
										key={index}
									>
										{deletingId === role.id ? (
											<LoadingOnButton />
										) : (
											<>
												<p>حذف</p>
												<Trash2 className="text-orange-500" />
											</>
										)}
									</button>
								</div>
							</div>
						</div>
						// <Roles
						// 	key={index}
						// 	id={role.id}
						// 	name={role.name}
						// 	permissions={role.permissions}
						// 	deleting={deleting}
						// />
					))
				) : (
					<p className="text-gray-500 text-right">
						هیچ نقشی موجود نیست.
					</p>
				)}
			</div>
			<EditRoleModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				role={currentRole}
				onSaveSuccess={getRoles}
			/>
		</>
	);
};

export default RolesAndPermissions;
