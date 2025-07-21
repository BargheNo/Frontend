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
		<div className={`sticky !bottom-0 ${className}`}>
			<DialogFooter className={`w-full items-end ${footerClassName}`}>
				{children}
			</DialogFooter>
		</div>
	);
}
