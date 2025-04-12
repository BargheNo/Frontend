import React from "react";
import Announcement from "./Announcement/Announcement";
import styles from "./AnnouncementsLanding.module.css";
export default function AnnouncementsLanding() {
	return (
		<div className="w-[70vw] h-screen flex flex-col place-self-center items-center">
			<div>
				<div
					className={`w-1/12 ${styles.announcements_top} flex place-content-center mr-0`}
				>
					<div
						className={`${styles.announcements_header} text-center text-white place-content-center text-3xl font-bold mx-auto my-auto`}
					>
						اطلاعیه‌ها
					</div>
				</div>
				<div
					className={`w-1/3 ${styles.announcements_bottom} p-2 flex mx-auto flex-col overflow-auto`}
				>
					<div
						className={`${styles.announcements_box} flex flex-col px-8 py-9 items-start gap-8`}
					>
						<Announcement
							header="اطلاعیه جدید"
							text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد..."
						/>
						<Announcement
							header="اطلاعیه جدید"
							text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد..."
						/>
						<Announcement
							header="اطلاعیه جدید"
							text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد..."
						/>
						<Announcement
							header="اطلاعیه جدید"
							text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد..."
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
