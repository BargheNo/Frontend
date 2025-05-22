import AnnounceBoard from "@/components/Announcement/AnnounceBoard/AnnounceBoard";
import AnnouncementBox from "@/components/Announcement/AnnouncementBox/AnnouncementBox";
import { Newspaper, Plus } from "lucide-react";
import AnnounceCard from "@/components/Announcement/AnnounceCard/AnnounceCard";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AnnounceEditor from "@/components/Announcement/AnnounceEditor/AnnounceEditor";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
export default function page() {
	return (
		<PageContainer>
			{/* <div className="flex flex-col gap-4 items-center p-14"> */}

			<Header header="اخبار و اطلاعیه‌ها" className="mb-0" />
			<AnnouncementBox
				className="w-full bg-[#F0EDEF] h-[60vh]"
				insideClassName="gap-5"
			>
				<AnnounceCard
					title="اخبار و اطلاعیه‌ها"
					content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello"
					writer="عرفان"
					date={new Date().getTime()}
				/>
				<AnnounceCard
					title="اخبار و اطلاعیه‌ها"
					content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello"
					writer="عرفان"
					date={new Date().getTime()}
				/>
				<AnnounceCard
					title="اخبار و اطلاعیه‌ها"
					content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello"
					writer="عرفان"
					date={new Date().getTime()}
				/>
				<AnnounceCard
					title="اخبار و اطلاعیه‌ها"
					content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello"
					writer="عرفان"
					date={new Date().getTime()}
				/>
				<AnnounceCard
					title="اخبار و اطلاعیه‌ها"
					content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello"
					writer="عرفان"
					date={new Date().getTime()}
				/>
				<AnnounceCard
					title="اخبار و اطلاعیه‌ها"
					content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello"
					writer="عرفان"
					date={new Date().getTime()}
				/>
				<AnnounceCard
					title="اخبار و اطلاعیه‌ها"
					content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello"
					writer="عرفان"
					date={new Date().getTime()}
				/>
			</AnnouncementBox>
			<Dialog>
				<DialogTrigger asChild>
					<button className="flex items-center justify-center w-full h-18 bg-[#F0EDEF] rounded-full neo-btn">
						<Plus color="#EA6639" size={50} />
					</button>
				</DialogTrigger>
				<DialogContent className="w-[80vw]! max-w-none! h-[80vh]! rtl p-8">
					<DialogHeader className="hidden">
						<DialogTitle></DialogTitle>
					</DialogHeader>
					<div>
						<AnnounceEditor />
					</div>
				</DialogContent>
			</Dialog>
			{/* </div> */}
		</PageContainer>
	);
}
