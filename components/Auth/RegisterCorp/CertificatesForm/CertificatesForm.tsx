import { UploadCloud } from "lucide-react";
import React, { useEffect } from "react";
import styles from "./CertificatesForm.module.css";

export default function CertificatesForm({
	setFieldValue,
	values,
}: {
	setFieldValue?: any;
	values: corpData;
}) {
	const handleFileChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: string
	) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setFieldValue(`certificates.${fieldName}`, file);
	};
	useEffect(() => {
		console.log(values);
	}, []);
	return (
		<div>
			<div className="text-[#003a8b] text-lg mb-1 font-black w-full">
				استعلام مودیان مالیات بر ارزش افزوده
			</div>
			<div
				className={`${styles.file_input_container} neu-shadow-inset rounded-md flex cursor-pointer relative justify-center text-xl place-text-center place-content-center align-middle place-self-center w-full text-fire-orange h-36`}
			>
				<input
					name="vatTaxpayerCertificate"
					type="file"
					placeholder="آپلود سند"
					onChange={(e) =>
						handleFileChange(e, "vatTaxpayerCertificate")
					}
					className={`${styles.file_input} absolute cursor-pointer`}
				/>
				<label
					className={`${styles.file_label} w-full m-auto flex flex-col cursor-pointer`}
				>
					<div className={`flex gap-2`}>
						<span>آپلود سند</span>
						<UploadCloud />
					</div>
					{values.certificates?.vatTaxpayerCertificate?.name && (
						<div className="text-sm opacity-80">
							نام سند:{" "}
							{values.certificates?.vatTaxpayerCertificate?.name}
						</div>
					)}
				</label>
			</div>
			<div className="text-[#003a8b] text-lg mt-3 mb-1 font-black w-full">
				تصویر آگهی روزنامه رسمی آخرین تغییرات
			</div>
			<div
				className={`${styles.file_input_container} neu-shadow-inset rounded-md flex cursor-pointer relative justify-center text-xl place-text-center place-content-center align-middle place-self-center w-full text-fire-orange h-36`}
			>
				<input
					name="officialNewspaperAD"
					type="file"
					placeholder="آپلود سند"
					onChange={(e) => handleFileChange(e, "officialNewspaperAD")}
					className={`${styles.file_input} absolute cursor-pointer`}
				/>
				<label
					className={`${styles.file_label} w-full m-auto flex flex-col cursor-pointer`}
				>
					<div className={`flex gap-2`}>
						<span>آپلود سند</span>
						<UploadCloud />
					</div>
					{values.certificates?.officialNewspaperAD?.name && (
						<div className="text-sm opacity-80">
							نام سند:{" "}
							{values.certificates?.officialNewspaperAD?.name}
						</div>
					)}
				</label>
			</div>
		</div>
	);
}
