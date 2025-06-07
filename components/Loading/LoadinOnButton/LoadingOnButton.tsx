import { Loader, Loader2 } from "lucide-react";
import React from "react";

export default function LoadingOnButton({
	className,
	size,
	...props
}: {
	size?: number;
	className?: string;
}) {
	return (
		<Loader2
			className={`animate-spin ${className}`}
			size={size ? size : 24}
			{...props}
		></Loader2>
	);
}
