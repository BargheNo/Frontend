import React from "react";
import { Plus } from "lucide-react";
import styles from "./AddComponent.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

export default function AddComponent({ title, ...props }: Props) {
	return (
		<div className="flex flex-col">
			<button className={`${styles.button} flex mx-auto`} {...props}>
				<Plus
					className={`relative text-[#FA682D] cursor-pointer w-28 h-auto`}
				/>
			</button>
			<div className="mt-3 text-navy-blue font-bold text-center">
				<p>{title}</p>
			</div>
		</div>
		// <button
		// 	{...props}
		// 	className={`flex flex-col justify-center items-center`}
		// >
		// 	<div>
		// 		<div className={`${styles.button} `}>
		// 			<Plus
		// 				className={`relative text-[#FA682D] cursor-pointer w-28 h-auto`}
		// 			/>
		// 		</div>
		// 	</div>
		// 		<div className="mt-3 text-navy-blue font-bold text-center">
		// 			<p>{title}</p>
		// 		</div>
		// </button>
	);
}
