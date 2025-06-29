import { useSelector } from "react-redux";

interface permission {
	id: number;
	name: string;
	description: string;
	category: string;
}

export default function useHasPermission(permission: string): boolean {
	const permissions = useSelector((state: RootState) => state.user.permissions);

	const names = permissions?.map((p: permission) => p.name) ?? [];

	return names.includes("general.all") || names.includes(permission);
}