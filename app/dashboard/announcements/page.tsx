import AnnounceBoard from "@/components/Announcement/AnnounceBoard/AnnounceBoard";
import AnnouncementBox from "@/components/Announcement/AnnouncementBox/AnnouncementBox";
import { Plus } from "lucide-react";
import AnnounceCard from "@/components/Announcement/AnnounceCard/AnnounceCard";
export default function page() {
  return (

    <div className="flex flex-col gap-4 items-center p-14">
      <h1>اخبار و اطلاعیه‌ها</h1>
      <AnnouncementBox className="w-full m-5 p-5 bg-red-700 h-[60vh]">
        <AnnounceBoard id="panel-1" className="w-full rounded-lg panel min-h-[45vh] flex flex-col justify-between items-start">
          <AnnounceCard 
          title="اخبار و اطلاعیه‌ها"
          content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
          سیبتکمسیتبکم ستشبکت کم
          ستبسمیتبکمسیکمشیسبمسبتکمستبشس
          ستبستبمسبتستبستبکسشت hello" 
          writer="عرفان" 
          date={new Date().getTime()} />
        </AnnounceBoard>
        <AnnounceBoard id="panel-2" className="w-full rounded-lg panel min-h-[45vh] flex flex-col justify-between items-start">
          <div>
            <h2>اخبار و اطلاعیه‌ها</h2>
          </div>
          <div>
            <h2>اخبار و اطلاعیه‌ها</h2>
          </div>
          <div>
            <h2>اخبار و اطلاعیه‌ها</h2>
          </div>
        </AnnounceBoard>
        <AnnounceBoard id="panel-3" className="w-full rounded-lg panel min-h-[45vh] flex flex-col justify-between items-start">
          <div>
            <h2>اخبار و اطلاعیه‌ها</h2>
          </div>
          <div>
            <h2>اخبار و اطلاعیه‌ها</h2>
          </div>
          <div>
            <h2>اخبار و اطلاعیه‌ها</h2>
          </div>
        </AnnounceBoard>
      </AnnouncementBox>
      <button className="flex items-center justify-center w-1/2 p-5 bg-red-500">
        <Plus />
      </button>
    </div>
  )
}
