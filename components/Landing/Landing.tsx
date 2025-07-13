import { vazir } from "@/lib/fonts";
import AboutUsLanding from "./AboutUsLanding/AboutUsLanding";
import BargheNoLanding from "./BargheNoLanding/BargheNoLanding";
import AnnouncementsLanding from "./AnnouncementsLanding/AnnouncementsLanding";
export default function Landing() {
	return (
		<div
			className={`items-center rtl no-scrollbar bg-[#F4F7F9] ${vazir.className} w-full`}
		>
			<BargheNoLanding />
			<AnnouncementsLanding />
			<AboutUsLanding />
		</div>
	);
}
