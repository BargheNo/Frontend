// import { vazir } from "@/lib/fonts";
// import { ArrowLeft } from "lucide-react";
// import panel from "@/public/images/Landing/panel.png";
// import Link from "next/link";
"use client";
import Landing from "@/components/Landing/Landing";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";

// import Image from "next/image";
export default function Page() {
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<Landing />
		// <div className="text-center items-center" dir="rtl">
		// 	{/*
		// 	 * برق نو
		// 	 */}
		// 	<div className="w-[90vw] h-screen flex place-self-center items-center">
		// 		<div className="flex flex-col gap-5 w-1/3">
		// 			<h1
		// 				className={`text-9xl font-bold ${vazir.className} flex place-self-center my-4`}
		// 			>
		// 				برق نو
		// 			</h1>
		// 			<span className={`${vazir.className} font-bold text-xl`}>
		// 				سامانه جامع مدیریت برق خورشیدی
		// 			</span>
		// 			<Link href="/login" className="w-full">
		// 				<button className="w-4/5 place-self-center rounded-full flex justify-center gap-2 hover:cursor-pointer shadow-md hover:scale-105 items-center place-content-center cursor-pointer hover:shadow-lg transition duration-300 text-white p-4 font-bold bg-gradient-to-r from-[#EB4132] to-[#DD392B]">
		// 					<span className={`${vazir.className} text-2xl`}>
		// 						ورود
		// 					</span>
		// 					<ArrowLeft />
		// 				</button>
		// 			</Link>
		// 		</div>
		// 		<div className="p-4 border-solid border-2 border-gray-300 rounded-lg">
		// 			<Image src={panel} alt="panel" className={``} />
		// 		</div>
		// 	</div>

		// 	{/*
		// 	 * اطلاعیه ها
		// 	 */}
		// 	<div></div>

		// 	{/*
		// 	 * درباره ما
		// 	 */}
		// 	<div></div>
		// </div>
	);
}
