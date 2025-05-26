import React from "react";
import { Plus } from "lucide-react";
import styles from "./AddComponent.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

export default function AddComponent({ title, ...props }: Props) {
	return (
		<button
			{...props}
			className={`flex flex-col justify-center items-center mt-9`}
		>
			<div>
				<div className={`${styles.button}`}>
					<Plus
						className={`relative text-[#FA682D] cursor-pointer w-28 h-auto`}
					/>
				</div>
				<div className="mt-3 text-navy-blue font-bold text-center">
					<p>{title}</p>
				</div>
			</div>
		</button>
	);
}
