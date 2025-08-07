import React from "react";
import { DialogFooter } from "../../ui/dialog";

export default function StickyFooter({
	children,
	className,
	footerClassName,
}: Readonly<{
	children?: React.ReactNode;
	className?: string;
	footerClassName?: string;
}>) {
	return (
		<div className={`w-full sticky bottom-0 py-4 bg-[#F1F4FC] ${className}`}>
			<DialogFooter className={`w-full ${footerClassName}`}>
				{children}
			</DialogFooter>
		</div>
	);
}
