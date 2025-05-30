"use client";
import style from "./CustomTextArea.module.css";
import { LucideIcon } from "lucide-react";
import { useField } from "formik";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name?: string;
	children?: React.ReactNode;
	icon?: LucideIcon;
	onIconClick?: () => void;
	autoFocus?: boolean;
	iconClassName?: string;
	errorClassName?: string;
	inputClassName?: string;
	textareaClassName?: string;
	containerClassName?: string;
}

const isRTL = (text: string | undefined): boolean => {
	if (text) {
		const rtlChars = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
		return rtlChars.test(text);
	}
	return true;
};

export default function CustomTextArea({
	name,
	children,
	icon: Icon,
	onIconClick,
	autoFocus = false,
	iconClassName,
	errorClassName,
	inputClassName,
	textareaClassName,
	containerClassName,
	...props
}: Props) {
	// const [isTextRTL, setTextRTL] = useState(true);
	const [field, meta] = useField(name);
	const hasError = meta.touched && meta.error;

	return (
		<div className={`${containerClassName} ${style.Conter}`}>
			<div className={style.inputWrapper}>
				{Icon && (
					<Icon
						onClick={onIconClick}
						className={`${style.icon} top-3 ${iconClassName}`}
					/>
				)}
				{field.value === "" && (
					<label className={`${style.text} ${errorClassName}`}>
						{children}
					</label>
				)}
				<textarea
					{...field}
					{...props}
					dir={isRTL(field.value) ? "rtl" : "ltr"}
					autoFocus={autoFocus}
					className={`${style.CustomInput} ${
						style.numberInput
					} ${inputClassName} ${textareaClassName} min-h-12 bg-[#f1f4fc] w-full ${
						isRTL(field.value) ? "text-right rtl" : "text-left ltr"
					}`}
					style={{ paddingLeft: Icon ? "42px" : "12px" }}
				/>
				{hasError && (
					<div className={style.errorMessage}>{meta.error}</div>
				)}
			</div>
		</div>
	);
}
