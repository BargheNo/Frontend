import { vazir } from "@/lib/fonts";
import AboutUsLanding from "./AboutUsLanding/AboutUsLanding";
import BargheNoLanding from "./BargheNoLanding/BargheNoLanding";
import AnnouncementsLanding from "./AnnouncementsLanding/AnnouncementsLanding";
import AnnouncementBox from "../Announcement/AnnouncementBox/AnnouncementBox";
import AnnounceView from "../Announcement/AnnounceView/AnnounceView";
import Footer from "../Footer/Footer";
import NeuFrame from "../Custom/NeuFrame/NeuFrame";
export default function Landing() {
  return (
    <div
      className={`items-center bg-[#F4F7F9] ${vazir.className} w-full`}
      dir="rtl"
    >
      <BargheNoLanding />
      {/* <AnnouncementsLanding /> */}
      <div className="w-full h-fit px-5 pt-40 ">
        <NeuFrame className="w-1/2 md:w-1/3 h-20 rounded-b-none bg-warm-white">
          <div className="flex justify-center items-center w-full h-full text-lg font-bold">
            اخبار و اطلاعیه‌ها
            </div>
        </NeuFrame>
        <AnnounceView onlyView  className="rounded-tr-none"/>
      </div>
      <AboutUsLanding />
      <Footer />
    </div>
  );
}
