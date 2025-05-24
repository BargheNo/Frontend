import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import AnnounceView from "@/components/Announcement/AnnounceView/AnnounceView";
import Header from "@/components/Header/Header";
import React from "react";

export default function Page() {
	return (
		<PageContainer>
      {/*<header="اخبار و اطلاعیه‌ها" />*/}
      <AnnounceView onlyView={true} />
		</PageContainer>
	);
}
