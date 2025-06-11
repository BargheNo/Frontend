"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Phone, Settings, User, Loader2, CircleX } from "lucide-react";
import { useSelector } from "react-redux";
import styles from "./Users.module.css";
import UserRolesModal from "./UserRoleModal";
import FilterUsers from "./FilterUsers";
import { getData } from "@/src/services/apiHub";

type UserType = {
	id: number;
	firstName: string;
	lastName: string;
	phone: string;
	status: "فعال" | "غیر فعال";
};

type RootState = {
	user: {
		accessToken: string;
	};
};

export default function Users() {
	const [users, setUsers] = useState<UserType[]>([]);
	const [loading, setLoading] = useState(true);
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
	const [selectedUserStatus, setSelectedUserStatus] = useState<
		"فعال" | "غیر فعال" | null
	>(null);

	const handleManageRoles = useCallback(
		(userId: number, status: "فعال" | "غیر فعال") => {
			setSelectedUserId(userId);
			setSelectedUserStatus(status);
			setIsRolesModalOpen(true);
		},
		[]
	);

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
		onManageRoles,
	}: UserType & {
		onManageRoles: (id: number, status: "فعال" | "غیر فعال") => void;
	}) => {
		const normalizedStatus = status === "غیر فعال" ? "غیر فعال" : "فعال";
		return (
			<div className="flex flex-row justify-between w-full h-full bg-[#F4F1F3] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-center">
				<div className="flex items-center gap-3 w-1/4">
					<div
						className={`${styles.icon} bg-[#F4F1F3] text-[#FA682D]`}
					>
						<User className="m-1" />
					</div>
					<p>
						{firstName} {lastName}
					</p>
				</div>
				<div className="flex items-center gap-3 w-1/4">
					<div
						className={`${styles.icon} bg-[#F4F1F3] text-[#FA682D]`}
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
				<button
					className={`${styles.button} text-[#FA682D] flex gap-2 items-center p-2 hover:cursor-pointer`}
					onClick={() => onManageRoles(id, normalizedStatus)}
				>
					<p className="font-bold">جزئیات بیشتر و مدیریت</p>
					<Settings />
				</button>
			</div>
		);
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-40">
				<Loader2 className="animate-spin text-orange-500" size={32} />
			</div>
		);
	}

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
	//         <Settings />اده
	//       </button>
	//     </div>
	//   );
	// };
	return (
		<div className="flex flex-col w-full text-gray-800 rounded-2xl overflow-hidden shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
			<FilterUsers
				accessToken={accessToken}
				onFilteredUsers={setUsers}
				setLoading={setLoading}
			/>
			{users.length === 0 ? (
				<div className="flex flex-row text-center items-center justify-center">
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
						onManageRoles={handleManageRoles}
					/>
				))
			)}
			<UserRolesModal
				isOpen={isRolesModalOpen}
				onClose={() => setIsRolesModalOpen(false)}
				userId={selectedUserId || 0}
				onSaveSuccess={fetchAllUsers}
				userStatus={selectedUserStatus}
			/>
		</div>
	);
}
