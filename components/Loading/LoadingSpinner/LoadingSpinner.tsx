import React from "react";
import "./style.css";
import { cn } from "@/lib/utils";

const LoadingSpinner = ({ scale = 30 , className }: { scale?: number, className?: string }) => {
	return (
		<div className={cn("w-full", className)}>
			<div className="flex justify-center items-center h-full w-full">
				<div
					className="bg-[#F1F4FC] w-fit p-16 rounded-4xl shadow-2xl"
					style={{ transform: `scale(${scale / 100})` }}
				>
					<div className="loading-spinner-wrapper">
						<span></span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
