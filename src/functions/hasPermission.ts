"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface permission {
	id: number;
	name: string;
	description: string;
	category: string;
}

export default function useHasPermission(permission: string): boolean {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);
	const permissions = useSelector(
		(state: RootState) => state.user.permissions
	);
	if (!permission) return true;
<<<<<<< HEAD
	console.log("permissions", permissions);
=======
>>>>>>> 2dadb8fb2c4cb98876ce46640a0036983350b529
	const names = Array.isArray(permissions)
		? permissions.map((p: permission) => p.name)
		: [];
	
	return isClient && (names.includes("general.all") || names.includes(permission));
}
