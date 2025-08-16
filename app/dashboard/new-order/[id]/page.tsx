"use client";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import NewOrderDetails from "@/components/NewOrderDetails/NewOrderDetails";
import React from "react";


export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);

    return (
        <PageContainer>
            <NewOrderDetails id={id} />
        </PageContainer>
    );
}
