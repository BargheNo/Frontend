import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import MessagesPagination from "@/components/Messages/message-pagination";
import Head from "next/head";
import React from "react";

export default function page() {
    return (
        <PageContainer>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <MessagesPagination />
        </PageContainer>
    );
}
