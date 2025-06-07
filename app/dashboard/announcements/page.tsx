import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
export default function page() {
	return (
		<PageContainer>
			<Header header="اخبار و اطلاعیه‌ها" />
			<AnnounceView onlyView={true} />
			{/* <AnnounceAddCard /> */}
		</PageContainer>
	);
}
