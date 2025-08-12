"use client";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import dynamic from "next/dynamic";
const AnnounceView = dynamic(
    () => import("@/components/Announcement/AnnounceView/AnnounceView"),
    { ssr: false }
);
export default function page() {
	return (
		<PageContainer>
			<AnnounceView />
		</PageContainer>
	);
}
