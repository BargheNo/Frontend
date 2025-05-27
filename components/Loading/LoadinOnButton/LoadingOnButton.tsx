import { Loader, Loader2 } from "lucide-react";
import React from "react";

export default function LoadingOnButton({ size, ...props }: { size?: number }) {
	return (
		<Loader2
			className="animate-spin"
			size={size ? size : 24}
			{...props}
		></Loader2>
	);
}
