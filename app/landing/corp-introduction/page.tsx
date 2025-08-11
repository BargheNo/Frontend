"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import panel from "@/public/images/corplanding/6ec5a885-aaf7-4aaf-8266-6026e76e5701.png";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
export default function Page() {
	const router = useRouter();
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const checkUser = () => {
		if (!accessToken) {
			router.push("/login");
			CustomToast(
				"برای ثبت شرکت ابتدا باید وارد حساب کاربری خود شوید!",
				"info"
			);
		}
	};
	return (
		<div className="bg-white h-screen md:-ml-12 flex md:flex-row flex-col w-screen">
			<div className="flex items-center md:w-1/2 mx-auto ">
				<div className="my-auto flex h-full md:px-10">
					<Image
						src={panel}
						alt="solar-panel-corp"
						className="my-auto"
					/>
				</div>
			</div>
			<div className="w-1/2 flex flex-col items-center m-auto md:mt-auto -mt-1 gap-4">
				<h1 className="vazir-bold md:text-4xl text-2xl text-nowrap flex place-self-center place-content-center w-full text-right rtl">
					در برق نو فروشنده شوید!
				</h1>
				<p className="vazir md:text-xl text-l text-nowrap flex place-self-center place-content-center w-full md:text-right text-center rtl">
					تنها در برق نو به همه نقاط ایران خدمات رسانی کنید
				</p>
				<Link
					href="/register-corp"
					className="w-full"
					onClick={() => checkUser()}
				>
					<button
						data-test="register-corp"
						className="rtl md:w-2/5 place-self-center rounded-full flex justify-center gap-2 hover:cursor-pointer shadow-md hover:scale-105 items-center place-content-center cursor-pointer hover:shadow-lg transition duration-300 text-white p-4 font-bold bg-gradient-to-r from-[#EB4132] to-[#DD392B]"
					>
						<span className={`vazir md:text-2xl text-xl text-nowrap`}>ثبت نام شرکت</span>
						<ArrowLeft />
					</button>
				</Link>
			</div>
		</div>
	);
}
