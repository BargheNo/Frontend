"use client";
import React, { useEffect, useState } from "react";
import CorpRepairCard from "@/components/Repair/Corp/CorpRepairCard";
import CorpRepairDialog from "@/components/Repair/Corp/CorpRepairDialog";
import { CorpRepairItem } from "@/types/CorpTypes";
import getCorpRepairRecords from "@/src/services/getCorpRepairRecords";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

interface ApiRepairItem extends Omit<CorpRepairItem, "Status"> {
	Status: string;
}

const mapStatus = (status: string): "pending" | "completed" => {
	// Add your status mapping logic here
	// For example:
	if (
		status.toLowerCase().includes("completed") ||
		status.toLowerCase().includes("done")
	) {
		return "completed";
	}
	return "pending";
};

export default function Page() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<CorpRepairItem | null>(
		null
	);
	const [repairItems, setRepairItmes] = useState<CorpRepairItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getCorpRepairRecords
			.GetRepairRequest()
			.then((res) => {
				const mappedData = res.data.map((item: ApiRepairItem) => ({
					...item,
					Status: mapStatus(item.Status),
				}));
				setRepairItmes(mappedData);
				setIsLoading(false);
			})
			.catch((err) => {
				console.error("err fetching repair records", err);
				setIsLoading(false);
			});
	}, []);

	const handleOpenDialog = (item: CorpRepairItem) => {
		setSelectedItem(item);
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setSelectedItem(null);
	};

	return (
		<PageContainer>
			{/* <div className="min-h-full flex flex-col gap-8 text-white py-8 px-4 md:px-14 bg-transparent"> */}
			<Header header="تعمیرات پیش رو" />
			{/* <h1 className="text-navy-blue self-end md:self-auto text-3xl font-black">
				تعمیرات پیش رو
				</h1> */}

			<div>
				<div className="flex flex-col neu-container">
					{isLoading ? (
						<LoadingSpinner />
					) : repairItems.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							هیچ درخواست تعمیراتی موجود نیست
						</div>
					) : (
						repairItems.map((item) => (
							<div key={item.ID} className="">
								<CorpRepairCard
									panelName={item.Panel.panelName}
									panelPower={item.Panel.power}
									owner={item.Panel.customerName}
									date={item.CreatedAt}
									status={item.Status} // TODO: change it with status, if available
									UrgencyLevel={item.UrgencyLevel}
									address={item.Panel.address.streetAddress}
									className="w-full"
									onDetailsClick={() =>
										handleOpenDialog(item)
									}
								/>
							</div>
						))
					)}
				</div>
			</div>

			{isDialogOpen && (
				<CorpRepairDialog
					isOpen={isDialogOpen}
					onClose={handleCloseDialog}
					repairItem={selectedItem}
				/>
			)}

			<br />
			<br />
			{/* </div> */}
		</PageContainer>
	);
}
