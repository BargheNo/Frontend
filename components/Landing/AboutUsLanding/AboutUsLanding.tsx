"use client";

import Image from "next/image";
import React, { useState } from "react";
import woman_solar from "@/public/images/Landing/woman-solar.svg";
import man_solar from "@/public/images/Landing/man-solar.svg";
import woman_solar_pic from "@/public/images/Landing/woman-solar.png";
import man_solar_pic from "@/public/images/Landing/man-solar.png";
import styles from "./AboutUsLanding.module.css";
export default function AboutUsLanding() {
	const [page, setPage] = useState("ContactUs");
	return (
		<div className="w-[70vw] h-[120vh] flex place-self-center items-center gap-16">
			<div className="w-1/2 relative z-10">
				{page === "ContactUs" ? (
					<Image src={man_solar_pic} alt="man solar" />
				) : (
					<Image src={woman_solar_pic} alt="woman solar" />
				)}
			</div>
			<div className="w-1/2" dir="ltr">
				<div className="flex">
					<div
						className={`${styles.placeholder} p-2`}
						onClick={() => setPage("ContactUs")}
					>
						<div
							className={`${
								styles.inner_placeholder
							} content-center text-center text-2xl ${
								page === "ContactUs" ? styles.contactus : ""
							}`}
						>
							تماس با ما
						</div>
					</div>
					<div
						className={`${styles.placeholder} p-2`}
						onClick={() => setPage("AboutUs")}
					>
						<div
							className={`${
								styles.inner_placeholder
							} content-center text-center text-2xl ${
								page === "AboutUs" ? styles.aboutus : ""
							}`}
						>
							درباره ما
						</div>
					</div>
				</div>
				<div className={`${styles.bottom} p-8 text-3xl`} dir="rtl">
					{page === "ContactUs"
						? "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با ن"
						: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص "}
				</div>
			</div>
		</div>
	);
}
