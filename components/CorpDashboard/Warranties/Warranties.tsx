import React, { useCallback, useEffect, useState } from "react";
import WarrantyCard from "./WarrantyCard";
import { Warranty } from "./warrantyTypes.ts";
import { useDispatch, useSelector } from "react-redux";
import { fetchWarrantyTypes } from "@/src/store/slices/warrantyTypesSlice.ts";
import { AppDispatch } from "@/src/store/store";
import { getData } from "@/src/services/apiHub.tsx";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner.tsx";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound.tsx";
import FilterSection from "@/components/FilterSection/FilterSection.tsx";

const Warranties = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [warrantyData, setWarrantyData] = useState<Warranty[]>([]);
    const [loadingGuarantees, setLoadingGuarantees] = useState(true);
    const [status, setStatus] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const corpId = useSelector((state: RootState) => state.user.corpId);

    const fetchWarranties = useCallback(() => {
        setLoadingGuarantees(true);
        dispatch(fetchWarrantyTypes());

        getData({
            endPoint: `/v1/corp/${corpId}/guarantee`,
            params: { status },
        })
            .then((data) => {
                console.log(data);
                setWarrantyData(data?.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoadingGuarantees(false));
    }, [dispatch, status, corpId]);

    useEffect(() => {
        fetchWarranties();
    }, [fetchWarranties]);

    return (
        <div className="space-y-6 relative">
            <FilterSection
                header="گارانتی‌ها"
                fieldName="گارانتی"
                statusesListApiRoute={`/v1/guarantee/status`}
                status={status}
                setStatus={setStatus}
                query={query}
                setQuery={setQuery}
                onSearchSubmit={() => fetchWarranties()}
            />
            {loadingGuarantees ? (
                <LoadingSpinner />
            ) : warrantyData && warrantyData?.length > 0 ? (
                <div className="grid md:grid-cols-2 md:gap-x-7 gap-y-5">
                    {warrantyData.map((warrantyItem) => (
                        <WarrantyCard
                            key={warrantyItem.id}
                            {...warrantyItem}
                            isArchived={warrantyItem.status !== "فعال"}
                        />
                    ))}
                </div>
            ) : (
                <NoRecordFound text="هیچ گارانتی یافت نشد." />
            )}
        </div>
    );
};

export default Warranties;
