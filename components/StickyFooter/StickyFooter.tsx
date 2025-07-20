import React from "react";
import { DialogFooter } from "../ui/dialog";

export default function StickyFooter({
	children,
    className
}: Readonly<{
	children: React.ReactNode;
    className?: string;
}>) {
	return (
		<div className={`sticky !bottom-0 ${className}`}>
			<DialogFooter className="w-full items-end">
				{children}
			</DialogFooter>
		</div>
	);
}
