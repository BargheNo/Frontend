import React, { useCallback, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import WarrantyCard from "./WarrantyCard";
import { Warranty } from "./warrantyTypes.ts";
import { useDispatch, useSelector } from "react-redux";
import { fetchWarrantyTypes } from "@/src/store/slices/warrantyTypesSlice.ts";
import { AppDispatch, RootState } from "@/src/store/store";
import { getData } from "@/src/services/apiHub.tsx";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner.tsx";
import NoRecordFound from "@/components/NoRecordFound/NoRecordFound.tsx";
import FilterSection from "@/components/FilterSection/FilterSection.tsx";

export interface WarrantiesRef {
    refreshWarranties: () => void;
}

const Warranties = forwardRef<WarrantiesRef>((props, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const [warrantyData, setWarrantyData] = useState<Warranty[]>([]);
    const [loadingGuarantees, setLoadingGuarantees] = useState(true);
    const [status, setStatus] = useState<string>("");
    const [query, setQuery] = useState<string>("");
    const corpId = useSelector((state: RootState) => state.user.corpId);

    const fetchWarranties = useCallback(() => {
        if (!corpId || typeof corpId !== 'number') return;
        setLoadingGuarantees(true);
        dispatch(fetchWarrantyTypes(corpId));

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
        if (corpId && typeof corpId === 'number') {
            fetchWarranties();
        }
    }, [fetchWarranties, corpId]);

    useImperativeHandle(ref, () => ({
        refreshWarranties: fetchWarranties,
    }));

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
                            onWarrantyUpdate={fetchWarranties}
                        />
                    ))}
                </div>
            ) : (
                <NoRecordFound text="هیچ گارانتی یافت نشد." />
            )}
        </div>
    );
});

Warranties.displayName = 'Warranties';

export default Warranties;
