"use client";
import style from "./CustomInput.module.css";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: LucideIcon;
	onSubmit?: () => void;
	autoFocus?: boolean;
	iconClassName?: string;
	inputClassName?: string;
	containerClassName?: string;
	value?: string;
	onValueChange?: React.Dispatch<React.SetStateAction<string>>;
}

const isRTL = (text: string | undefined): boolean => {
	if (text) {
		const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
		return rtlChars.test(text);
	}
	return true;
};

export default function CustomInputNoValidation({
	icon: Icon,
	onSubmit,
	autoFocus = false,
	iconClassName,
	inputClassName,
	containerClassName,
	value,
	onValueChange,
	...props
}: Props) {
	return (
		<div
			className={cn(
				"flex flex-col w-full text-[clamp(10px,3.5vw,15px)]",
				containerClassName
			)}
		>
			<div className="relative w-full">
				{Icon && (
					<Icon
						onClick={onSubmit}
						className={cn(
							"absolute left-[10px] top-1/2 -translate-y-1/2 text-[16px] text-[#fa682d] cursor-pointer",
							"max-[600px]:w-[5.5vw]",
							iconClassName
						)}
					/>
				)}
				<input
					dir={isRTL(value) ? "rtl" : "ltr"}
					{...props}
					autoFocus={autoFocus}
					onChange={(e) =>
						onValueChange && onValueChange(e?.target?.value)
					}
					className={cn(
						"w-full p-[10px] rounded-[9px] bg-[#f1f4fc] shadow-[inset_1px_2px_5px_rgba(0,0,0,0.2)]",
						"text-[clamp(10px,3.5vw,15px)]",
						isRTL(value) ? "text-right rtl" : "text-left ltr",
						inputClassName
					)}
					style={{ paddingLeft: Icon ? "42px" : "12px" }}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							onSubmit?.();
						}
					}}
				/>
			</div>
		</div>
	);
}
