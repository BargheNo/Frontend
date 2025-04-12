import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { vazir } from "@/lib/fonts";
import panel from "@/public/images/Landing/panel.png";
import Link from "next/link";
import React from "react";
import styles from "./BargheNoLanding.module.css";

export default function BargheNoLanding() {
	return (
		<div className="w-[90vw] h-screen flex place-self-center items-center">
			<div className="flex flex-col gap-5 w-1/2">
				<h1
					className={`text-9xl font-bold text-[#193947] ${vazir.className} flex place-self-center my-4`}
				>
					برق نو
				</h1>
				<span
					className={`${vazir.className} font-bold text-xl text-center`}
				>
					سامانه جامع مدیریت برق خورشیدی
				</span>
				<Link href="/login" className="w-full">
					<button className="w-3/5 place-self-center rounded-full flex justify-center gap-2 hover:cursor-pointer shadow-md hover:scale-105 items-center place-content-center cursor-pointer hover:shadow-lg transition duration-300 text-white p-4 font-bold bg-gradient-to-r from-[#EB4132] to-[#DD392B]">
						<span className={`${vazir.className} text-2xl`}>
							ورود
						</span>
						<ArrowLeft />
					</button>
				</Link>
			</div>
			<div className="p-8">
				<div className="p-6 border-solid border-2 border-gray-100 rounded-lg">
					<div className="p-6 border-solid border-2 border-gray-100 rounded-lg">
						<div className="p-6 border-solid border-2 border-gray-200 rounded-lg">
							<div className="p-6 border-solid border-2 border-gray-200 rounded-lg">
								<Image
									src={panel}
									alt="panel"
									className={`${styles.panel}`}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
