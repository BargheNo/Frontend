import AddPanel from "@/components/InstalledPanels/add-panel";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import InstalledPanelPagination from "@/components/InstalledPanels/InstalldPanelPagination";
import Head from "next/head";
import React from "react";

export default function page() {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <PageContainer>
                {/* <AddPanel /> */}
                <InstalledPanelPagination />
            </PageContainer>
        </>
    );
}
