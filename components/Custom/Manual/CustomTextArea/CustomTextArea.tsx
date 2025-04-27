"use client";
import style from "./CustomTextArea.module.css";
import { LucideIcon } from "lucide-react";
import React, { useMemo } from "react";

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
	value?: string | number;
	icon?: LucideIcon;
	onIconClick?: () => void;
	autoFocus?: boolean;
	iconClassName?: string;
	inputClassName?: string;
	containerClassName?: string;
	type?: React.HTMLInputTypeAttribute;
}

const isRTL = (text: string | number | undefined): boolean => {
	if (text === undefined || text === null) return false;

	const textStr = String(text);
	const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
	return rtlChars.test(textStr);
};

export default function CustomInput({
	value,
	icon: Icon,
	onIconClick,
	autoFocus = false,
	iconClassName,
	inputClassName,
	containerClassName,
	type = "text",
	...props
}: Props) {
	const textDirection = useMemo(
		() => (isRTL(value) ? "rtl" : "ltr"),
		[value]
	);
	const handleIconClick = (e: React.MouseEvent) => {
		e.preventDefault();
		onIconClick?.();
	};

	return (
		<div className={`${containerClassName} ${style.Conter}`}>
			<div className={style.inputWrapper}>
				{Icon && (
					<Icon
						onClick={handleIconClick}
						className={`${style.icon} ${iconClassName}`}
					/>
				)}
				<textarea
					dir={textDirection}
					{...props}
					value={value}
					autoFocus={autoFocus}
					className={`${style.CustomInput} ${
						type === "number" ? style.numberInput : ""
					} ${inputClassName} ${
						textDirection === "rtl"
							? "text-right rtl"
							: "text-left ltr"
					}`}
					style={{ paddingLeft: Icon ? "42px" : "12px" }}
				/>
			</div>
		</div>
	);
}
