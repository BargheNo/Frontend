"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getData } from "@/src/services/apiHub";

type Role = {
	id: number;
	name: string;
};

type FilterUsersProps = {
	accessToken: string;
	onFilteredUsers: (users: any[]) => void;
	setLoading: (loading: boolean) => void;
};

export default function FilterUsers({
	accessToken,
	onFilteredUsers,
	setLoading,
}: FilterUsersProps) {
	const [filterType, setFilterType] = useState<string>("all");
	const [filterValue, setFilterValue] = useState<string>("all");
	const [roles, setRoles] = useState<Role[]>([]);
	const [loadingRoles, setLoadingRoles] = useState(false);
	const isInitialMount = useRef(true);

	// Fetch all roles when needed
	const fetchRoles = useCallback(async () => {
		setLoadingRoles(true);
		getData({ endPoint: `/v1/admin/roles` })
			.then((data) => {
				setRoles(data.data);
			})
			.finally(() => setLoadingRoles(false));
	}, [accessToken]);

	// Fetch all users (no filtering)
	const fetchAllUsers = useCallback(async () => {
		setLoading(true);
		getData({ endPoint: `/v1/admin/users?statuses=1&statuses=2` })
			.then((data) => {
				onFilteredUsers(data.data);
			})
			.finally(() => setLoading(false));
	}, [accessToken, onFilteredUsers, setLoading]);

	// Fetch users by status
	const fetchUsersByStatus = useCallback(
		async (status: string) => {
			getData({
				endPoint: `/v1/admin/users?statuses=${status}`,
			})
				.then((data) => {
					onFilteredUsers(data.data);
				})
				.finally(() => setLoading(false));
		},
		[accessToken, onFilteredUsers, setLoading]
	);

	// Fetch users by role
	const fetchUsersByRole = useCallback(
		async (roleId: string) => {
			setLoading(true);
			getData({ endPoint: `/v1/admin/roles/${roleId}/owners` })
				.then((data) => {
					const formattedUsers = data.data
						.filter(
							(user: any) =>
								user.firstName || user.lastName || user.phone
						) // Filter empty users
						.map((user: any, index: number) => ({
							id: user.id === 0 ? index + 1 : user.id, // Handle ID 0 by using index
							firstName: user.firstName,
							lastName: user.lastName,
							phone: user.phone,
							status:
								user.status === "active" ? "active" : "block", // Ensure consistent status values
						}));

					onFilteredUsers(formattedUsers);
				})
				.finally(() => setLoading(false));
		},
		[accessToken, onFilteredUsers, setLoading]
	);

	// Handle filter changes
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}

		if (filterType === "all") {
			fetchAllUsers();
		} else if (
			filterType === "role" &&
			filterValue &&
			filterValue !== "all"
		) {
			fetchUsersByRole(filterValue);
		} else if (
			filterType === "status" &&
			filterValue &&
			filterValue !== "all"
		) {
			fetchUsersByStatus(filterValue);
		} else if (filterValue === "all") {
			fetchAllUsers();
		}
	}, [
		filterType,
		filterValue,
		fetchAllUsers,
		fetchUsersByRole,
		fetchUsersByStatus,
	]);

	// Fetch roles when role filter is selected
	useEffect(() => {
		if (filterType === "role") {
			fetchRoles();
		}
	}, [filterType, fetchRoles]);

	const renderSecondDropdown = () => {
		switch (filterType) {
			case "role":
				return (
					<Select
						onValueChange={(value) => setFilterValue(value)}
						defaultValue="all"
						disabled={loadingRoles}
					>
						<SelectTrigger
							dir="rtl"
							className="bg-[#F4F1F3] w-40 cursor-pointer"
						>
							<SelectValue
								placeholder={
									loadingRoles
										? "در حال بارگذاری..."
										: "انتخاب نقش"
								}
							/>
						</SelectTrigger>
						<SelectContent dir="rtl">
							<SelectItem value="all">همه نقش‌ها</SelectItem>
							{roles.map((role) => (
								<SelectItem
									key={role.id}
									value={String(role.id)}
									className="cursor-pointer"
								>
									{role.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				);
			case "status":
				return (
					<Select
						onValueChange={(value) => setFilterValue(value)}
						defaultValue="all"
					>
						<SelectTrigger
							dir="rtl"
							className="bg-[#F4F1F3] w-40 cursor-pointer"
						>
							<SelectValue placeholder="وضعیت" />
						</SelectTrigger>
						<SelectContent dir="rtl">
							<SelectItem value="all" className="cursor-pointer">
								همه وضعیت‌ها
							</SelectItem>
							<SelectItem value="1" className="cursor-pointer">
								فعال
							</SelectItem>
							<SelectItem value="2" className="cursor-pointer">
								مسدود
							</SelectItem>
						</SelectContent>
					</Select>
				);
			default:
				return null;
		}
	};

	return (
		<div className="flex flex-col w-full text-gray-800 rounded-2xl overflow-hidden bg-white shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
			<div className="p-5 items-center flex gap-6">
				<div className="flex gap-4 items-center">
					<Select
						defaultValue="all"
						onValueChange={(value) => {
							setFilterType(value);
							setFilterValue("all");
						}}
					>
						<SelectTrigger
							dir="rtl"
							className="bg-[#F4F1F3] w-40 cursor-pointer"
						>
							<SelectValue placeholder="فیلتر بر اساس" />
						</SelectTrigger>
						<SelectContent dir="rtl">
							<SelectItem value="all" className="cursor-pointer">
								همه کاربران
							</SelectItem>
							<SelectItem value="role" className="cursor-pointer">
								بر اساس نقش‌ها
							</SelectItem>
							<SelectItem
								value="status"
								className="cursor-pointer"
							>
								بر اساس وضعیت
							</SelectItem>
						</SelectContent>
					</Select>

					{renderSecondDropdown()}
				</div>
			</div>
		</div>
	);
}
