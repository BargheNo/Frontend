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
		<div className={`w-full sticky bottom-0 pb-6 ${className}`}>
			<DialogFooter className={`w-full pt-4 ${footerClassName}`}>
				{children}
			</DialogFooter>
		</div>
	);
}
