"use client";
import CorpPanelDetails from "@/components/CorpDashboard/PanelDetails/CorpPanelDetails";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const id = params?.id as string;

    return <CorpPanelDetails id={id} />;
}
