import useHasPermission from "@/src/functions/hasPermission";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function PanelAsideIcon({ item, mode }) {
	const pathname = usePathname();
	const hasPermission = true;
	// const hasPermission = useHasPermission(item?.RNPName ?? "general.all");
	// const hasPermission = useHasPermission(item?.RNPName);
	return hasPermission ? (
		<Link key={item.path} href={item.path}>
			<span
				className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer ${
					pathname === item.path
						? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${
								mode === "customer"
									? "from-[#A55FDA] to-[#F37240]"
									: mode === "corp"
									? "from-[#2979FF] to-[#1b6cf5]"
									: "from-[#FF5B18] to-[#FF6809]"
						  } text-white`
						: "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
				}`}
			>
				{item.icon}
			</span>
		</Link>
	) : (
		<></>
	);
}

export function PanelAsideTitle({ item, mode }) {
	const pathname = usePathname();
	const hasPermission = true;
	// const hasPermission = useHasPermission(item?.RNPName ?? "general.all");
	// const hasPermission = useHasPermission(item?.RNPName);
	return hasPermission ? (
		<Link key={item.path} href={item.path}>
			<span
				className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-pointer ${
					pathname === item.path
						? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${
								mode === "customer"
									? "from-[#A55FDA] to-[#F37240]"
									: mode === "corp"
									? "from-[#2979FF] to-[#1b6cf5]"
									: "from-[#FF5B18] to-[#FF6809]"
						  } text-white`
						: "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
				}`}
			>
				{item.name}
			</span>
		</Link>
	) : (
		<></>
	);
}
