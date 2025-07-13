import React from "react";
import { LucideIcon } from "lucide-react";

interface PanelIconWithBackgroundProps {
	icon: LucideIcon;
	color?: string;
	iconClassName?: string;
	className?: string;
	iconSize?: number;
	backgroundColor?: string | null;
	text?: string | null;
}

export default function PanelIconWithBackground({
	icon: Icon,
	color = "#FA682D",
	iconClassName,
	className,
	iconSize = 5,
	backgroundColor = null,
	text = null
}: PanelIconWithBackgroundProps) {
	return (
		<div
			className={`${className} flex gap-1.5 p-2 rounded-xl ${backgroundColor ? `bg-${backgroundColor}` : ""} shadow-[-4px_-4px_10px_rgba(255,255,255,1),2px_2px_5px_rgba(0,0,0,0.3)]`}
		>
			<div className={`flex flex-col min-w-${iconSize} min-h-${iconSize} items-center justify-center align-center`}>
				<Icon
					className={`${iconClassName} w-${iconSize} h-${iconSize} self-center align-middle transition-transform duration-200 hover:scale-125`}
					style={{ color }}
				/>
			</div>
			{text && <div className="flex justify-center items-center w-full">
				<span className="self-center">{text}</span>
			</div>}
		</div>
	);
}
