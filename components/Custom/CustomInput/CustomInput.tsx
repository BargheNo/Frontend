"use client";
import style from "./CustomInput.module.css";
import { LucideIcon } from "lucide-react";
import { useField } from "formik";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	name?: string;
	children?: React.ReactNode;
	icon?: LucideIcon;
	onIconClick?: () => void;
	autoFocus?: boolean;
	iconClassName?: string;
	errorClassName?: string;
	inputClassName?: string;
	containerClassName?: string;
}

const isRTL = (text: string | undefined): boolean => {
  if (text) {
    const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    return rtlChars.test(text);
  }
  return true;
};

export default function CustomInput({
	name,
	children,
	icon: Icon,
	onIconClick,
	autoFocus = false,
	iconClassName,
	errorClassName,
	inputClassName,
	containerClassName,
	...props
}: Props) {
	const [field, meta] = useField(name);
	const hasError = meta.touched && meta.error;

	// Ensure field.value is never undefined
	const value = field.value || "";

	return (
		<div className={`${containerClassName} ${style.Conter}`}>
			<div className={style.inputWrapper}>
				{Icon && (
					<Icon
						onClick={onIconClick}
						className={`${style.icon} ${iconClassName}`}
					/>
				)}
				{value === "" && (
					<label className={`${style.text} ${errorClassName}`}>
						{children}
					</label>
				)}
				<input
					dir={isRTL(value) ? "rtl" : "ltr"}
					{...field}
					{...props}
					autoFocus={autoFocus}
					className={`${style.CustomInput} ${
						style.numberInput
					} ${inputClassName} ${
						isRTL(value) ? "text-right rtl" : "text-left ltr"
					}`}
					style={{ paddingLeft: Icon ? "42px" : "12px" }}
				/>
				{hasError && (
					<div className={`${style.errorMessage} rtl`}>{meta.error}</div>
				)}
			</div>
		</div>
	);
}
