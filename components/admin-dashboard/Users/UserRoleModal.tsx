"use client";
import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import { vazir } from "@/lib/fonts";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { getData, putData } from "@/src/services/apiHub";

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

interface UserRolesModalProps {
	isOpen: boolean;
	onClose: () => void;
	userId: number;
	onSaveSuccess: () => void;
	userStatus: "active" | "blocked" | null;
}

const UserRolesModal: React.FC<UserRolesModalProps> = ({
	isOpen,
	onClose,
	userId,
	onSaveSuccess,
}) => {
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const [allRoles, setAllRoles] = useState<Role[]>([]);
	const [userRoles, setUserRoles] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isBanning, setIsBanning] = useState(false);
	const [currentUserStatus, setCurrentUserStatus] = useState<
		"active" | "blocked"
	>("active");

	// Fetch all available roles
	const getAllRoles = async () => {
		getData({ endPoint: `/v1/admin/roles` }).then((data) => {
			setAllRoles(data.data);
		});
	};

	// Fetch roles for the current user
	const getUserRoles = async (userId: number) => {
		getData({ endPoint: `/v1/admin/users/${userId}/roles` }).then(
			(data) => {
				setUserRoles(data.data.map((role: Role) => role.id));
			}
		);
	};

	// Handle checkbox changes
	const handleRoleChange = (roleId: number) => {
		setUserRoles((prev) => {
			if (prev.includes(roleId)) {
				return prev.filter((id) => id !== roleId);
			} else {
				return [...prev, roleId];
			}
		});
	};

	// Save updated roles
	const saveRoles = async () => {
		setIsSaving(true);
		const formData = {
			roleIDs: userRoles,
		};
		putData({
			endPoint: `/v1/admin/users/${userId}/roles`,
			data: formData,
		})
			.then((data) => {
				CustomToast(data?.message, "success");
				onSaveSuccess();
				onClose();
			})
			.finally(() => setIsSaving(false));
	};

	const handleBanAction = async () => {
		const action = currentUserStatus === "active" ? "ban" : "unban";
		setIsBanning(true);
		putData({ endPoint: `/v1/admin/users/${userId}/${action}` })
			.then((data) => {
				CustomToast(data?.message, "success");
				setCurrentUserStatus(
					currentUserStatus === "active" ? "blocked" : "active"
				);
				onSaveSuccess();
			})
			.finally(() => setIsBanning(false));
	};

	// Load data when modal opens or user changes
	useEffect(() => {
		if (isOpen && userId) {
			setIsLoading(true);
			Promise.all([getAllRoles(), getUserRoles(userId)]).finally(() =>
				setIsLoading(false)
			);
		}
	}, [isOpen, userId]);

	if (!isOpen || !userId) return null;

	return ReactDOM.createPortal(
		<div
			className={`fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 rtl ${vazir.className}`}
		>
			<div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-bold text-blue-800">
						مدیریت نقش‌های کاربر
					</h3>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
						disabled={isSaving}
					>
						<X size={24} />
					</button>
				</div>

				{isLoading ? (
					<div className="flex justify-center items-center h-40">
						<Loader2
							className="animate-spin text-orange-500"
							size={32}
						/>
					</div>
				) : (
					<div className="space-y-4">
						{allRoles.map((role) => (
							<div
								key={role.id}
								className="flex items-center gap-3 p-3 border-b"
							>
								<input
									type="checkbox"
									id={`role-${role.id}`}
									checked={userRoles.includes(role.id)}
									onChange={() => handleRoleChange(role.id)}
									className="w-5 h-5 text-orange-500 rounded focus:ring-orange-400"
								/>
								<label
									htmlFor={`role-${role.id}`}
									className="text-gray-700"
								>
									{role.name}
								</label>
							</div>
						))}
					</div>
				)}

				<div className="flex justify-between items-center border-t pt-4">
					<button
						onClick={handleBanAction}
						disabled={isLoading || isBanning}
						className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
							currentUserStatus === "active"
								? "bg-red-500 text-white hover:bg-red-600"
								: "bg-green-500 text-white hover:bg-green-600"
						}`}
					>
						{isBanning && (
							<Loader2 className="animate-spin" size={18} />
						)}
						{currentUserStatus === "active"
							? "مسدود کردن"
							: "رفع انسداد"}
					</button>

					<div className="flex justify-end gap-4">
						<button
							onClick={onClose}
							disabled={isSaving || isBanning}
							className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
						>
							انصراف
						</button>
						<button
							onClick={saveRoles}
							disabled={isLoading || isSaving || isBanning}
							className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
						>
							{isSaving && (
								<Loader2 className="animate-spin" size={18} />
							)}
							ذخیره تغییرات
						</button>
					</div>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default UserRolesModal;
