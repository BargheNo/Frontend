import React from "react";
import styles from "./PageContainer.module.css";
export default function PageContainer({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	return <div className={`${className} w-full min-h-full flex flex-col text-black py-8 md:px-14 px-2.5 gap-4`}>{children}</div>;
}
