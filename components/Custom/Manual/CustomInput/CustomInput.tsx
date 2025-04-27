"use client";
import style from "./CustomInput.module.css";
import { LucideIcon } from "lucide-react";
import React, { useEffect } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	value?: string | number;
	icon?: LucideIcon;
	onIconClick?: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	autoFocus?: boolean;
	iconClassName?: string;
	inputClassName?: string;
	containerClassName?: string;
	type?: React.HTMLInputTypeAttribute;
}

const isRTL = (text: string | number | undefined): boolean => {
	if (text === undefined || text === null || text === "") return true;

	const textStr = String(text);
	const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
	return rtlChars.test(textStr);
};

export default function CustomInput({
	value,
	icon: Icon,
	onIconClick,
	onChange,
	autoFocus = false,
	iconClassName,
	inputClassName,
	containerClassName,
	type = "text",
	...props
}: Props) {
	const textDirection = isRTL(value) ? "rtl" : "ltr";
	// const textDirection = useMemo(
	// 	() => (isRTL(value) ? "rtl" : "ltr"),
	// 	[value]
	// );
	const handleIconClick = (e: React.MouseEvent) => {
		e.preventDefault();
		onIconClick?.();
	};
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		onChange?.(e);
	};
	useEffect(() => {
		console.log("value", value);
	}, [value]);
	return (
		<div className={`${containerClassName} ${style.Conter}`}>
			<div className={style.inputWrapper}>
				{Icon && (
					<Icon
						onClick={handleIconClick}
						className={`${style.icon} ${iconClassName}`}
					/>
				)}
				<input
					{...props}
					dir={textDirection}
					value={value}
					autoFocus={autoFocus}
					onChange={handleOnChange}
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
