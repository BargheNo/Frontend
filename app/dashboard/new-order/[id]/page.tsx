"use client";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import { getData } from "@/src/services/apiHub";
import React, { useEffect, useState } from "react";

interface Order {
    id: number;
    name: string;
    createdTime: string;
    status: string;
    powerRequest: number;
    maxCost: number;
    buildingType: string;
    address: Address;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    // const router = useRouter();
    // const { id } = router.query;
    const [order, setOrder] = useState<Order>();
    const [loading, setLoading] = useState<boolean>(true);
    const { id } = React.use(params);

    useEffect(() => {
        setLoading(true);
        getData({ endPoint: `/v1/user/installation/request/${id}` })
            .then((data) => {
                console.log(data?.data);
                setOrder(data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [id]);

    return (
        <PageContainer>
            <Header header="جزئیات درخواست" />
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <div className="neu-container">
                        
                    </div>
                </>
            )}
        </PageContainer>
    );
}
