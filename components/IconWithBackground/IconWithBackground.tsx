import { IconWithBackgroundProps } from "@/src/types/IconWithBackgroundType";
import React from "react";

export default function IconWithBackground({
	icon: Icon,
	color = "#FA682D",
	iconClassName,
	className,
	iconSize = 4,
	backgroundColor = "white"
}: IconWithBackgroundProps) {
	return (
		<div
			className={`${className} p-2 rounded-xl bg-${backgroundColor} shadow-[-4px_-4px_10px_rgba(255,255,255,1),2px_2px_5px_rgba(0,0,0,0.3)]`}
		>
			<Icon
				className={`${iconClassName} w-${iconSize} h-${iconSize} transition-transform duration-200 hover:scale-125`}
				style={{ color }}
			/>
		</div>
	);
}
