"use client";
import React from "react";
import styles from "./RolesAndPermissions.module.css";
import {
	User,
	SquareCheckBig,
	Trash2,
	Pencil,
	Plus,
	Dot,
	Loader2,
	UserRoundCog,
	Vote,
	Check,
} from "lucide-react";
import { useSelector } from "react-redux";
import generateErrorMessage from "@/src/functions/handleAPIErrors";
import { toast } from "sonner";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import * as Yup from "yup";
import { Form, Formik, FieldArray } from "formik";
import { useEffect, useState } from "react";
import EditRoleModal from "./EditRoleModal";
import CreateRoleModal from "./CreateRoleModal";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import Header from "@/components/Header/Header";
import { Badge } from "@/components/ui/badge";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";

const initialValuesForm = { name: "", permissionIDs: [] };

const validationSchemaForm = Yup.object({
	name: Yup.string().required("نام نقش الزامی است"),
	permissionIDs: Yup.array().of(Yup.number()),
});

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
	const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
	const [editOpen, setEditOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
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
	const savePermissions = async (values) => {
		if (!values.role) return;
		setIsSaving(true);

		try {
			const response = await fetch(
				`http://46.249.99.69:8080/v1/admin/roles/${role.id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						name: values.name,
						permissionIDs: values.permissionIDs,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update role");
			}

			const result = await response.json();
			// toast.success(result.message);
			CustomToast(result?.message, "success");
		} catch (error: any) {
			const errMsg =
				generateErrorMessage(error) ||
				"هنگام به‌روزرسانی نقش مشکلی پیش آمد.";
			// toast.error(errMsg);
			CustomToast(errMsg, "error");
		} finally {
			setIsSaving(false);
		}
	};

	// const openEditModal = (role: Role) => {
	// 	setCurrentRole(role);
	// 	setIsModalOpen(true);
	// };
	const permissionsByCategory = allPermissions.reduce((acc, permission) => {
		if (!acc[permission.category]) {
			acc[permission.category] = [];
		}
		acc[permission.category].push(permission);
		return acc;
	}, {} as Record<string, Permission[]>);
	const getRolePermissions = async (roleId: string) => {
		try {
			const response = await fetch(
				`http://46.249.99.69:8080/v1/admin/roles/${roleId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await response.json();
			setSelectedPermissions(
				data.data.permissions.map((p: Permission) => p.id)
			);
		} catch (err: any) {
			console.log(err);
			const errMsg =
				generateErrorMessage(err) ||
				"مشکلی در دریافت مجوزهای نقش رخ داد.";
			// toast.error(errMsg);
			CustomToast(errMsg, "error");
		}
	};
	const getAllPermissions = async () => {
		try {
			const response = await fetch(
				"http://46.249.99.69:8080/v1/admin/permissions",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			const data = await response.json();
			setAllPermissions(data.data);
		} catch (err: any) {
			const errMsg =
				generateErrorMessage(err) || "مشکلی در دریافت مجوزها رخ داد.";
			// toast.error(errMsg);
			CustomToast(errMsg, "error");
		}
	};
	useEffect(() => {
		getAllPermissions();
		getRoles();
	}, []);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		permissionId: number,
		push: any,
		remove: any
	) => {
		// setFieldValue("");
		if (e.target.checked) {
			push(permissionId);
		} else {
			remove(permissionId);
		}
	};
	return (
		<>
			<CreateRoleModal onSaveSuccess={getRoles} />
			<Header header="نقش‌های فعلی" />
			<Dialog open={editOpen} onOpenChange={setEditOpen}>
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
								<div
									key={index}
									className="flex flex-col rtl justify-between content-center h-full gap-5 py-5 px-5 overflow-hidden relative border-t-1 border-gray-300 w-full first:border-t-0 min-h-[20px]"
								>
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
												{role.permissions.length ===
												0 ? (
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
												{role.permissions.length >=
													5 && (
													<Badge className="bg-fire-orange">
														...
													</Badge>
												)}
											</div>
										</div>
									</div>
									<div
										className="flex flex-row w-full h-full px-4 gap-4 rtl justify-end"
									>
										<DialogTrigger asChild>
											<button
												key={index}
												onClick={() => setCurrentRole(role)}
												className={`cta-neu-button cursor-pointer w-1/8 flex flex-row ${styles.button} items-center content-center justify-center h-1/2 w-1/2`}
											>
												<p>تغییر</p>
												<Pencil className="text-orange-500" />
											</button>
										</DialogTrigger>
										{/* <DialogTrigger asChild key={index}>
											<button
												key={index}
												className={`cta-neu-button cursor-pointer w-1/8 flex flex-row ${styles.button} items-center content-center justify-center h-1/2 w-1/2`}
											>
												<p>تغییر</p>
												<Pencil className="text-orange-500" />
											</button>
										</DialogTrigger>
										<DialogContent
											style={{
												backgroundColor: "#F1F4FC",
											}}
											className="w-full sm:min-w-[750px] mx-auto no-scrollbar p-4 overflow-auto py-4 max-h-[90vh] h-[90vh] overflow-y-auto rtl"
										>
											<EditRoleModal
												editOpen={editOpen}
												setEditOpen={setEditOpen}
												onClose={() =>
													setIsModalOpen(false)
												}
												role={currentRole}
												onSaveSuccess={getRoles}
											/>
										</DialogContent> */}

										{/* <button
											className={`cta-neu-button cursor-pointer w-1/8 flex flex-row ${styles.button} items-center content-center justify-center h-1/2 w-1/2`}
											onClick={(editOpen) => setEditOpen(!editOpen)}
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
										</button> */}
										<button
											className={`cta-neu-button flex cursor-pointer w-1/8 ${styles.button} items-center content-center justify-center h-1/2 w-1/2 cursor-pointer`}
											onClick={() => deleteRole(role.id)}
											key={role.id}
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
				<DialogContent
					style={{
						backgroundColor: "#F1F4FC",
					}}
					className="w-full sm:min-w-[750px] mx-auto no-scrollbar p-4 overflow-auto py-4 max-h-[90vh] h-[90vh] overflow-y-auto rtl"
				>
					<EditRoleModal
						editOpen={editOpen}
						setEditOpen={setEditOpen}
						onClose={() => setIsModalOpen(false)}
						role={currentRole}
						onSaveSuccess={getRoles}
					/>
				</DialogContent>
			</Dialog>
			{/* <EditRoleModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				role={currentRole}
				onSaveSuccess={getRoles}
			/> */}
		</>
	);
};

export default RolesAndPermissions;
