import React from "react";
import styles from "./PageContainer.module.css";
export default function PageContainer({
	className,
	children,
}: {
	className?: string;
	children?: React.ReactNode;
}) {
	return <div className={`${className} min-h-full flex flex-col text-black py-8 px-5 md:px-14 gap-4`}>{children}</div>;
}
