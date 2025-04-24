"use client"
import React, { useEffect, useState } from "react";
import CorpRepairCard from "@/components/Repair/Corp/CorpRepairCard";
import CorpRepairDialog, { CorpRepairItem } from "@/components/Repair/Corp/CorpRepairDialog";
import getCorpRepairRecords from "@/src/services/getCorpRepairRecords";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function Page() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<CorpRepairItem | null>(null);
	const [repairItems, setRepairItmes] = useState<CorpRepairItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		getCorpRepairRecords.GetRepairRequest()
		  .then((res) => {
			// console.log(res.data);

			setRepairItmes(res.data);
			setIsLoading(false);
		  }
		  )
		  .catch(err => {
			console.error("err fetching repair records", err)
			setIsLoading(false);
		  })
	} ,[]);

	const handleOpenDialog = (item: CorpRepairItem) => {
		setSelectedItem(item);
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setSelectedItem(null);
	};

	return (
		<div className="min-h-full flex flex-col gap-8 text-white py-8 px-14 bg-transparent">
			<h1 className="text-navy-blue text-3xl font-black">
				تعمیرات پیش رو
			</h1>

			{isLoading && <LoadingSpinner />}

			<div>
				<div className="flex flex-col neu-container">

					{repairItems.map((item) => (
						<div 
							key={item.ID} 
							className=""
						>
							<CorpRepairCard
								panelName={item.Panel.panelName}
								panelPower={item.Panel.power}
								owner={item.Panel.customerName}
								date={item.CreatedAt}
								status={item.Description}    // TODO: change it with status, if available
								address={item.Panel.address.streetAddress}
								className="w-full"
								onDetailsClick={() => handleOpenDialog(item)}
							/>
						</div>
					))}
				</div>
			</div>

			{isDialogOpen && (
				<CorpRepairDialog
					isOpen={isDialogOpen}
					onClose={handleCloseDialog}
					repairItem={selectedItem}
				/>
			)}
		</div>
	);
}
