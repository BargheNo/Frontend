import { vazir } from "@/lib/fonts";
import AboutUsLanding from "./AboutUsLanding/AboutUsLanding";
import BargheNoLanding from "./BargheNoLanding/BargheNoLanding";
import AnnounceView from "../Announcement/AnnounceView/AnnounceView";
import Footer from "../Footer/Footer";
import NeuFrame from "../Custom/NeuFrame/NeuFrame";
import NewsLanding from "./NewsLanding/NewsLanding";
export default function Landing() {
  return (
    <div
      className={`items-center bg-[#F4F7F9] ${vazir.className} w-full overflow-x-hidden`}
      dir="rtl"
    >
      <BargheNoLanding />
      <NewsLanding />
      <AboutUsLanding />
      <Footer />
    </div>
  );
}
