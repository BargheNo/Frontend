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
    const [status, setStatus] = useState<string>("");
    // const [resultPerPage, setResultPerPage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [history, sethistory] = useState<Orderhistory[]>([]);
    const [sortBy, setSortBy] = useState<string>("");
    const [asc, setAsc] = useState<boolean>(false);

    const [query, setQuery] = useState<string>("");

    const handelHistory = useCallback(() => {
        setIsLoading(true);
        getData({
            endPoint: `/v1/user/installation/request`,
            params: {
                status,
                sortBy,
                asc,
                query,
                // page: currentPage,
                // pageSize: resultPerPage,
            },
        })
            .then((res) => {
                // console.log(res);
                // setPaginationInfo(res?.data?.pagination);
                sethistory(res?.data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [status, sortBy, asc, query]);
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
                    asc={asc}
                    setAsc={setAsc}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    query={query}
                    setQuery={setQuery}
                    onSearchSubmit={() => handelHistory()}
                    // currentPage={currentPage}
                    // setCurrentPage={setCurrentPage}
                    // paginationInfo={paginationInfo}
                />
            </PageContainer>
        </>
    );
}
