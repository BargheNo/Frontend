import React, { useEffect, useState } from "react";
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
    // const [status, setStatus] = useState(1); // Default to active warranties
    const [loadingGuarantees, setLoadingGuarantees] = useState(true);

    // const [statuses, setStatuses] = useState<status[] | null>(null);
    const [status, setStatus] = useState<string>("");
    // const [resultPerPage, setResultPerPage] = useState<string>("");
    const corpId = useSelector((state: RootState) => state.user.corpId);
    useEffect(() => {
        setLoadingGuarantees(true);
        dispatch(fetchWarrantyTypes());

        getData({
            endPoint: `/v1/corp/${corpId}/guarantee`,
            params: { status },
        })
            .then((data) => {
                console.log(data);
                setWarrantyData(data?.data);
                // getData({ endPoint: `/v1/guarantee/status` })
                // 	.then((data) => {
                // 		setStatuses(data?.data);
                // 	})
                // 	.catch((err) => console.log(err))
                // 	.finally(() => setLoadingGuarantees(false));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoadingGuarantees(false));
    }, [dispatch, status, corpId]);

    // if (loadingGuarantees) {
    // 	return <LoadingSpinner />;
    // }

    // if (!warrantyData) {
    // 	return <div>هیچ گارانتی ای یافت نشد!</div>;
    // }
    return (
        <div className="space-y-6 relative">
            {/* <div className="flex place-items-center">
				<Header header="گارانتی‌ها" />
				{statuses && (
					<Select
						value={String(status)}
						onValueChange={(value) => setStatus(value)}
						data-test="warranty-filter"
					>
						<SelectTrigger
							dir="rtl"
							className="flex w-40 cursor-pointer relative bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2]"
							data-test="warranty-filter-trigger"
						>
							<SelectValue placeholder="وضعیت گارانتی" />
						</SelectTrigger>
						<SelectContent dir="rtl">
							{statuses?.map((status: status, index: number) => (
								<SelectItem
									key={index}
									value={String(status.id)}
									className="cursor-pointer"
								>
									{status.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}
			</div> */}
            <FilterSection
                header="گارانتی‌ها"
                fieldName="گارانتی"
                statusesListApiRoute={`/v1/guarantee/status`}
                status={status}
                setStatus={setStatus}
                // resultPerPage={resultPerPage}
                // setResultPerPage={setResultPerPage}
                // resultPerPages={resultPerPages}
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
