"use client";
import CorpPanelDetails from "@/components/CorpDashboard/PanelDetails/CorpPanelDetails";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const id = params?.id as string;

    return (
        <PageContainer>
            <CorpPanelDetails id={id} />
        </PageContainer>
    );
}
