import AnnounceBoard from "@/components/Announcement/AnnounceBoard/AnnounceBoard";
import AnnouncementBox from "@/components/Announcement/AnnouncementBox/AnnouncementBox";
import { Newspaper, Plus } from "lucide-react";
import AnnounceCard from "@/components/Announcement/AnnounceCard/AnnounceCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AnnounceEditor from "@/components/Announcement/AnnounceEditor/AnnounceEditor";
import CustomInput from "@/components/Custom/CustomInput/CustomInput";
export default function page() {
  return (

    <div className="flex flex-col gap-4 items-center p-14">
      <h1 className="text-3xl self-start">اخبار و اطلاعیه‌ها</h1>
      <AnnouncementBox className="w-full p-5 bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] h-[60vh]"
      insideClassName="gap-5">
        {/* <AnnounceBoard id="panel-1" className="w-full rounded-lg panel min-h-[45vh] flex flex-col gap-2 justify-center items-center"> */}
          <AnnounceCard 
            title="اخبار و اطلاعیه‌ها"
            content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello" 
            writer="عرفان" 
            date={new Date().getTime()} />
          <AnnounceCard 
            title="اخبار و اطلاعیه‌ها"
            content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello" 
            writer="عرفان" 
            date={new Date().getTime()} />
          <AnnounceCard 
            title="اخبار و اطلاعیه‌ها"
            content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello" 
            writer="عرفان" 
            date={new Date().getTime()} />
        {/* </AnnounceBoard> */}
        {/* <AnnounceBoard id="panel-2" className="w-full rounded-lg panel min-h-[45vh] flex flex-col justify-between items-start"> */}
          <AnnounceCard 
            title="اخبار و اطلاعیه‌ها"
            content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello" 
            writer="عرفان" 
            date={new Date().getTime()} />
          <AnnounceCard 
            title="اخبار و اطلاعیه‌ها"
            content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello" 
            writer="عرفان" 
            date={new Date().getTime()} />
        {/* </AnnounceBoard> */}
        {/* <AnnounceBoard id="panel-3" className="w-full rounded-lg panel min-h-[45vh] flex flex-col justify-between items-start"> */}
          <AnnounceCard 
            title="اخبار و اطلاعیه‌ها"
            content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello" 
            writer="عرفان" 
            date={new Date().getTime()} />
          <AnnounceCard 
            title="اخبار و اطلاعیه‌ها"
            content="اخبار و اطلاعیه‌ها سسمبتشسمیبتیسکخبتکمشیسب یسبکهشستبخشیستبخک سبتمسب خسبمست کمبتس خبشسکم تبکخست کخستب س 
            سیبتکمسیتبکم ستشبکت کم
            ستبسمیتبکمسیکمشیسبمسبتکمستبشس
            ستبستبمسبتستبستبکسشت hello" 
            writer="عرفان" 
            date={new Date().getTime()} />
        {/* </AnnounceBoard> */}
      </AnnouncementBox>
      <Dialog>
        <DialogTrigger asChild>
          <button className="relative flex items-center justify-center w-full h-18 bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] rounded-full neo-btn">
            <Plus color="#EA6639" size={50}/>
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
    </div>
  )
}
