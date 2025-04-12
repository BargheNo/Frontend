"use client";
import Users from "@/components/admin-dashboard/Users/Users";
import FilterSection from "@/components/CorpDashboard/FilterSection";
import { Gem, ShieldUser, User, Wrench } from "lucide-react";
import React, { useState } from "react";
import styles from "./styles.module.css";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";
export default function Page() {
  const [selected, setSelected] = useState("customers");
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return (
		<div className="flex flex-col items-center gap-12 p-12 w-full bg-[#F0EDEF] min-h-[100vh]">
			<div className="flex gap-12">
				<button
					className="bg-white rounded-2xl p-[5px] neu-shadow flex hover:cursor-pointer w-36"
					onClick={() => setSelected("customers")}
				>
					<div
						className={`${
							selected === "customers"
								? `${styles.container} text-white bg-gradient-to-r to-[#E41DF2] from-[#CF1DF2]`
								: ""
						} flex gap-1 place-content-center w-full items-center px-4 py-2`}
					>
						<p>خریداران</p>
						<User />
					</div>
				</button>
				<button
					className="bg-white rounded-2xl p-[5px] neu-shadow flex hover:cursor-pointer w-36"
					onClick={() => setSelected("sellers")}
				>
					<div
						className={`${
							selected === "sellers"
								? `${styles.container} text-white bg-gradient-to-r to-[#2979FF] from-[#2070F6]`
								: ""
						} flex gap-1 place-content-center w-full items-center px-4 py-2`}
					>
						<p>فروشندگان</p>
						<Gem />
					</div>
				</button>
				<button
					className="bg-white rounded-2xl p-[5px] neu-shadow flex hover:cursor-pointer w-36"
					onClick={() => setSelected("technicians")}
				>
					<div
						className={`${
							selected === "technicians"
								? `${styles.container} text-white bg-gradient-to-r to-[#31C556] from-[#02AB2D]`
								: ""
						} flex gap-1 place-content-center w-full items-center px-4 py-2`}
					>
						<p>متخصصین</p>
						<Wrench />
					</div>
				</button>
				<button
					className="bg-white rounded-2xl p-[5px] neu-shadow flex hover:cursor-pointer w-36"
					onClick={() => setSelected("admins")}
				>
					<div
						className={`${
							selected === "admins"
								? `${styles.container} text-white bg-gradient-to-r to-[#F23423] from-[#E32818]`
								: ""
						} flex gap-1 place-content-center w-full items-center px-4 py-2`}
					>
						<p>ادمین‌ها</p>
						<ShieldUser />
					</div>
				</button>
				{/* <button className='bg-white rounded-2xl p-[5px] neu-shadow flex hover:cursor-pointer w-36'><div className={`${styles.container} flex gap-1 place-content-center w-full items-center px-4 py-2 bg-gradient-to-r to-[#E41DF2] from-[#CF1DF2] ${selected === "customers" ? "text-white" : "text-black"}`}><p>فروشندگان</p><Gem /></div></button>
        <button className='bg-white rounded-2xl p-[5px] neu-shadow flex hover:cursor-pointer w-36'><div className={`${styles.container} flex gap-1 place-content-center w-full items-center px-4 py-2 bg-gradient-to-r to-[#E41DF2] from-[#CF1DF2] ${selected === "customers" ? "text-white" : "text-black"}`}><p>متخصصین</p><Wrench /></div></button>
        <button className='bg-white rounded-2xl p-[5px] neu-shadow flex hover:cursor-pointer w-36'><div className={`${styles.container} flex gap-1 place-content-center w-full items-center px-4 py-2 bg-gradient-to-r to-[#E41DF2] from-[#CF1DF2] ${selected === "customers" ? "text-white" : "text-black"}`}><p>ادمین‌ها</p><ShieldUser /></div></button> */}
				{/* <button className='bg-white rounded-2xl px-4 py-2 neu-shadow flex'><p>فروشندگان</p><Gem /></button>
        <button className='bg-white rounded-2xl px-4 py-2 neu-shadow flex'><p>متخصصین</p><Wrench /></button>
        <button className='bg-white rounded-2xl px-4 py-2 neu-shadow flex'><p>ادمین‌ها</p><ShieldUser /></button> */}
			</div>
			<FilterSection />
			<Users />
		</div>
	);
}
