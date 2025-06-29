import { useSelector } from "react-redux";

interface permission {
	id: number;
	name: string;
	description: string;
	category: string;
}

function GetPermissions(): permission[] {
	const permissions = useSelector((state: RootState) => state).user
		.permissions;
	return permissions?.length ? permissions : [];
}

export default function hasPermission(permission: string): boolean {
	const permissions =
		GetPermissions()?.map((permission: permission) => permission.name);
	if (permissions?.includes("general.all")) return true;
	return permissions?.includes(permission);
}
