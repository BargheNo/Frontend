"use client";
import Head from "next/head";
import Neworder from "@/components/New-Order/new-order";
import OrderHistoryPagination from "@/components/OrderHistory/OrderHistoryPagination";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import { useCallback, useEffect, useState } from "react";
import { Orderhistory } from "@/src/types/OrderhistoryType";
import { getData } from "@/src/services/apiHub";

export default function Page() {
    // const [paginationInfo, setPaginationInfo] = useState<
    //     paginationInfoType | undefined
    // >(undefined);
    // const [currentPage, setCurrentPage] = useState<number>(1);
    const [status, setStatus] = useState<string>("5");
    const [resultPerPage, setResultPerPage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [history, sethistory] = useState<Orderhistory[]>([]);
    const handelHistory = useCallback(() => {
        setIsLoading(true);
        getData({
            endPoint: `/v1/user/installation/request`,
            params: {
                status: status,
                // page: currentPage,
                // pageSize: resultPerPage,
            },
        })
            .then((res) => {
                // console.log(res);
                // setPaginationInfo(res?.data?.paginationInfo);
                sethistory(res?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [status]);
    // }, [resultPerPage, status, currentPage]);
    useEffect(() => {
        handelHistory();
    }, [handelHistory]);
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <PageContainer>
                <Neworder handelHistory={handelHistory} />
                <OrderHistoryPagination
                    status={status}
                    setStatus={setStatus}
                    isLoading={isLoading}
                    history={history}
                    // resultPerPage={resultPerPage}
                    // setResultPerPage={setResultPerPage}
                    // currentPage={currentPage}
                    // setCurrentPage={setCurrentPage}
                    // paginationInfo={paginationInfo}
                />
            </PageContainer>
        </>
    );
}
