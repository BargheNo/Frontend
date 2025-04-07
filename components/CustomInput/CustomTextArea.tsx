"use client";
import style from "./CustomInput.module.css";
import { LucideIcon } from "lucide-react";
import { useField } from "formik";
import React from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    children: React.ReactNode;
    icon?: LucideIcon;
    onIconClick?: () => void;
    iconClassName?: string;
    errorClassName?: string;
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

export const CustomTextArea = React.forwardRef<HTMLTextAreaElement, Props>(({
    name,
    children,
    icon: Icon,
    onIconClick,
    iconClassName,
    errorClassName,
    textareaClassName,
    containerClassName,
    ...props
}, ref) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    return (
        <div className={`${style.Conter} ${containerClassName}`}>
            <div className={style.inputWrapper}>
                {Icon && (
                    <Icon
                        onClick={onIconClick}
                        className={`${style.icon} ${iconClassName}`}
                        style={{ top: "20px" }}
                    />
                )}
                {field.value === "" && (
                    <label 
                        className={`${style.text} ${errorClassName}`}
                        style={{ top: "10px", transform: "none" }}
                    >
                        {children}
                    </label>
                )}
                <textarea
                    ref={ref}
                    dir={isRTL(field.value) ? "rtl" : "ltr"}
                    {...field}
                    {...props}
                    className={`${style.CustomInput} ${textareaClassName} ${
                        isRTL(field.value) ? "text-right" : "text-left"
                    }`}
                    style={{ 
                        paddingLeft: Icon ? "42px" : "12px",
                        minHeight: "100px",
                    }}
                />
                {hasError && (
                    <div className={style.errorMessage}>{meta.error}</div>
                )}
            </div>
        </div>
    );
});

CustomTextArea.displayName = 'CustomTextArea';

