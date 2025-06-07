import { vazir } from "@/lib/fonts";
import AboutUsLanding from "./AboutUsLanding/AboutUsLanding";
import BargheNoLanding from "./BargheNoLanding/BargheNoLanding";
import AnnouncementsLanding from "./AnnouncementsLanding/AnnouncementsLanding";
import AnnouncementBox from "../Announcement/AnnouncementBox/AnnouncementBox";
import AnnounceView from "../Announcement/AnnounceView/AnnounceView";
export default function Landing() {
  return (
    <div
      className={`items-center bg-[#F4F7F9] ${vazir.className} w-full`}
      dir="rtl"
    >
      <BargheNoLanding />
      {/* <AnnouncementsLanding /> */}
      <div className="w-full h-fit p-5">
        <AnnounceView onlyView />
      </div>
      <AboutUsLanding />
    </div>
  );
}
