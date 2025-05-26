import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
export default function page() {
	return (
		<PageContainer>
			{/* <div className="flex flex-col gap-4 items-center p-14"> */}

			<Header header="اخبار و اطلاعیه‌ها" />
			<AnnounceView onlyView={true} />
			{/* <AnnounceAddCard /> */}
			{/* </div> */}
		</PageContainer>
	);
}
