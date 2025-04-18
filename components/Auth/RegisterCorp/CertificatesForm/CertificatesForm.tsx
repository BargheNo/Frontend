import Header from "@/components/Header/Header";
import { Upload, UploadCloud } from "lucide-react";
import React from "react";
import styles from "./CertificatesForm.module.css";

export default function CertificatesForm({
	setFieldValue,
	values,
}: {
	setFieldValue?: any;
	values: corpData;
}) {
	return (
		<div>
			<div className="text-[#003a8b] text-lg mb-1 font-black w-full">
				استعلام مودیان مالیات بر ارزش افزوده
			</div>
			<div
				className={`${styles.file_input_container} neu-shadow-inset rounded-md flex cursor-pointer relative justify-center text-xl place-text-center place-content-center align-middle place-self-center w-full text-fire-orange h-36`}
			>
				<input
					type="file"
					placeholder="آپلود سند"
					className={`${styles.file_input} absolute cursor-pointer`}
				/>
				<label className={`${styles.file_label} m-auto flex gap-2`}>
					<span>آپلود سند</span>
					<UploadCloud />
				</label>
			</div>
			<div className="text-[#003a8b] text-lg mt-3 mb-1 font-black w-full">
				تصویر آگهی روزنامه رسمی آخرین تغییرات
			</div>
			<div
				className={`${styles.file_input_container} neu-shadow-inset rounded-md flex cursor-pointer relative justify-center text-xl place-text-center place-content-center align-middle place-self-center w-full text-fire-orange h-36`}
			>
				<input
					type="file"
					placeholder="آپلود سند"
					className={`${styles.file_input} absolute cursor-pointer`}
				/>
				<label className={`${styles.file_label} m-auto flex gap-2`}>
					<span>آپلود سند</span>
					<UploadCloud />
				</label>
			</div>
		</div>
	);
}
