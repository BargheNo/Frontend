import LoadingOnButton from "@/components/Loading/LoadinOnButton/LoadingOnButton";
import { Button } from "@/components/ui/button";
import React from "react";

export default function SubmitButton({
	loading,
	children,
	onClick,
	className
}: {
	loading?: boolean;
	children?: React.ReactNode;
	onClick?: any;
	className?: string;
}) {
	return (
		<Button
			onClick={onClick}
			type="submit"
			disabled={loading}
			className={`min-w-28 flex place-content-center bg-gradient-to-br cursor-pointer from-[#34C759] to-[#00A92B] hover:from-[#2AAE4F] hover:to-[#008C25] active:from-[#008C25] active:to-[#2AAE4F] text-white px-4 rounded-md transition-all duration-300 ${className}`}
		>
			{loading ? <LoadingOnButton /> : <p>{children}</p>}
		</Button>
	);
}
