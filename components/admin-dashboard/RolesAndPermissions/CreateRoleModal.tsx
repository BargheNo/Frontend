"use client";
import React, { useEffect, useState } from "react";
import { Loader2, Vote, Check, UserRoundCog } from "lucide-react";
import { useSelector } from "react-redux";
import styles from "./RolesAndPermissions.module.css";

import * as Yup from "yup";
import { Form, Formik, FieldArray } from "formik";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AddComponent from "@/components/AddComponent/AddComponent";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import { getData, postData } from "@/src/services/apiHub";

type Permission = {
	id: number;
	name: string;
	description: string;
	category: string;
};

const initialValuesForm = { name: "", permissionIDs: [] };

const validationSchemaForm = Yup.object({
	name: Yup.string().required("نام نقش الزامی است"),
	permissionIDs: Yup.array().of(Yup.number()),
});

interface CreateRoleModalProps {
	// isOpen: boolean;
	// onClose: () => void;
	onSaveSuccess: () => void;
}

const CreateRoleModal: React.FC<CreateRoleModalProps> = ({
	// isOpen,
	// onClose,
	onSaveSuccess,
}) => {
	const [open, setOpen] = useState<boolean>(false);
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
	const [selectedPermissions, setSelectedPermissions] = useState<number[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [roleName, setRoleName] = useState("");

	const getAllPermissions = async () => {
		getData({ endPoint: `/v1/admin/permissions` }).then((data) => {
			setAllPermissions(data.data);
		});
	};

	// Create new role
	const createRole = async (values: any) => {
		console.log(values);
		// if (!roleName.trim()) {
		if (values.name === "") {
			CustomToast("نام نقش نمی‌تواند خالی باشد", "warning");
			// toast.error("نام نقش نمی‌تواند خالی باشد");
			return;
		}

		setIsSaving(true);
		const formData = {
			name: roleName,
			permissionIDs: selectedPermissions,
		};
		postData({ endPoint: `/v1/admin/roles`, data: formData })
			.then((data) => {
				CustomToast(data?.message, "success");
				onSaveSuccess();
				setRoleName("");
				setSelectedPermissions([]);
				setOpen(false);
			})
			.finally(() => setIsSaving(false));
	};

	// Load permissions when modal opens
	// useEffect(() => {
	// 	if (isOpen) {
	// 		setIsLoading(true);
	// 		getAllPermissions().finally(() => setIsLoading(false));
	// 	}
	// }, [isOpen]);

	// Group permissions by category
	const permissionsByCategory = allPermissions.reduce((acc, permission) => {
		if (!acc[permission.category]) {
			acc[permission.category] = [];
		}
		acc[permission.category].push(permission);
		return acc;
	}, {} as Record<string, Permission[]>);
	useEffect(() => {
		getAllPermissions();
		// console.log("allPermissions", allPermissions);
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
	// if (!isOpen) return null;
	return (
		<>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<AddComponent title="افزودن نقش" />
				</DialogTrigger>
				<DialogContent
					style={{ backgroundColor: "#F1F4FC" }}
					className="w-full sm:min-w-[750px] mx-auto no-scrollbar p-4 overflow-auto py-4 max-h-[90vh] h-[90vh] overflow-y-auto rtl"
				>
					<Formik
						initialValues={initialValuesForm}
						validationSchema={validationSchemaForm}
						onSubmit={(values) => createRole(values)}
					>
						<Form>
							<DialogHeader>
								<DialogTitle className="flex justify-center items-end font-bold mt-3.5">
									افزودن نقش جدید
								</DialogTitle>
							</DialogHeader>

							{isLoading ? (
								<div className="flex justify-center items-center h-40">
									<Loader2
										className="animate-spin text-orange-500"
										size={32}
									/>
								</div>
							) : (
								<div className="flex flex-col gap-6">
									<CustomInput
										name="name"
										placeholder="نام نقش"
										icon={UserRoundCog}
										inputClassName="bg-white"
									/>
									<div className="space-y-6">
										<FieldArray name="permissionIDs">
											{({ push, remove }) => (
												<>
													{Object.entries(
														permissionsByCategory
													).map(
														([
															category,
															permissions,
														]) => (
															<div
																key={category}
																className={`bg-white p-4 rounded-xl w-full shadow-sm items-center gap-3 rtl ${styles.shadow} min-h-[140px]`}
															>
																<h4 className="text-lg text-orange-500 font-semibold mb-3 flex items-center gap-2">
																	<Vote />
																	{category}
																</h4>
																<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
																	{permissions.map(
																		(
																			permission,
																			index
																		) => (
																			<div
																				key={
																					index
																				}
																				className="flex items-center gap-2"
																			>
																				<div className="relative">
																					<input
																						name={`permissionIDs.[${permission.id}]`}
																						type="checkbox"
																						onChange={(
																							e
																						) =>
																							handleChange(
																								e,
																								permission.id,
																								push,
																								remove
																							)
																						}
																						className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-[#2979FF] checked:border-blue-500 mt-0.5"
																					/>
																					<Check className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3 text-white opacity-0 pointer-events-none peer-checked:opacity-100 w-4.5 h-4.5 " />
																				</div>
																				<label
																					htmlFor={`perm-${permission.id}`}
																					className="text-gray-700"
																				>
																					{
																						permission.description
																					}
																				</label>
																			</div>
																		)
																	)}
																</div>
															</div>
														)
													)}
												</>
											)}
										</FieldArray>
									</div>
								</div>
							)}
							<div className="flex justify-end gap-96 mt-6">
								<button
									disabled={isSaving}
									onClick={() => setOpen(false)}
									className="px-4 py-2 text-gray-600 border cta-neu-button border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 disabled:opacity-50"
								>
									انصراف
								</button>
								<button
									disabled={isLoading || isSaving}
									className="px-4 py-2 bg-orange-500 cta-neu-button place-content-center items-center text-white rounded-lg hover:bg-orange-600 cursor-pointer disabled:opacity-50 flex gap-2"
								>
									{isSaving ? (
										<LoadingOnButton />
									) : (
										<p>ایجاد نقش</p>
									)}
								</button>
							</div>
						</Form>
					</Formik>
				</DialogContent>
			</Dialog>
		</>
	);
	// return ReactDOM.createPortal(
	// 	<div
	// 		className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 rtl ${vazir.className}`}
	// 	>
	// 		<div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
	// 			<div className="flex justify-between items-center mb-4">
	// 				<div className="flex items-center gap-2">
	// 					<h3 className="text-xl font-bold text-blue-800">
	// 						ایجاد نقش جدید:
	// 					</h3>
	// 					<input
	// 						type="text"
	// 						value={roleName}
	// 						onChange={(e) => setRoleName(e.target.value)}
	// 						placeholder="نام نقش"
	// 						className="p-1 border-b border-blue-800 focus:outline-none focus:border-orange-500 text-lg font-bold text-blue-800 w-50 text-center mx-auto block ltr"
	// 					/>
	// 				</div>
	// 				<button
	// 					// onClick={onClose}
	// 					className="text-gray-500 hover:text-gray-700"
	// 					disabled={isSaving}
	// 				>
	// 					<X size={24} />
	// 				</button>
	// 			</div>

	// 			{isLoading ? (
	// 				<div className="flex justify-center items-center h-40">
	// 					<Loader2
	// 						className="animate-spin text-orange-500"
	// 						size={32}
	// 					/>
	// 				</div>
	// 			) : (
	// 				<div className="space-y-6">
	// 					{Object.entries(permissionsByCategory).map(
	// 						([category, permissions]) => (
	// 							<div
	// 								key={category}
	// 								className={`bg-white p-4 rounded-xl w-full shadow-sm items-center gap-3 rtl ${styles.shadow} min-h-[140px]`}
	// 							>
	// 								<h4 className="text-lg text-orange-500 font-semibold mb-3 flex items-center gap-2">
	// 									<Vote />
	// 									{category}
	// 								</h4>
	// 								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
	// 									{permissions.map((permission) => (
	// 										<div
	// 											key={permission.id}
	// 											className="flex items-center gap-2"
	// 										>
	// 											<input
	// 												type="checkbox"
	// 												id={`perm-${permission.id}`}
	// 												checked={selectedPermissions.includes(
	// 													permission.id
	// 												)}
	// 												onChange={() =>
	// 													handlePermissionChange(
	// 														permission.id
	// 													)
	// 												}
	// 												className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
	// 											/>
	// 											<label
	// 												htmlFor={`perm-${permission.id}`}
	// 												className="text-gray-700"
	// 											>
	// 												{permission.description}
	// 											</label>
	// 										</div>
	// 									))}
	// 								</div>
	// 							</div>
	// 						)
	// 					)}
	// 				</div>
	// 			)}

	// 			<div className="flex justify-end gap-4 mt-6">
	// 				<button
	// 					// onClick={onClose}
	// 					disabled={isSaving}
	// 					className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
	// 				>
	// 					انصراف
	// 				</button>
	// 				<button
	// 					onClick={createRole}
	// 					disabled={isLoading || isSaving}
	// 					className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
	// 				>
	// 					{isSaving && (
	// 						<Loader2 className="animate-spin" size={18} />
	// 					)}
	// 					ایجاد نقش
	// 				</button>
	// 			</div>
	// 		</div>
	// 	</div>,
	// 	document.body
	// );
};

export default CreateRoleModal;
