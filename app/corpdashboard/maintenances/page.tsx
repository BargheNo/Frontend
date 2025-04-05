"use client"
import React, { useState } from "react";
import CorpRepairCard from "@/components/Repair/Corp/CorpRepairCard";
import CorpRepairDialog, { CorpRepairItem } from "@/components/Repair/Corp/CorpRepairDialog";

const repairItems: CorpRepairItem[] = [
	{
		id: "1",
		text: "سرویس ماهانۀ پنل شیارز",
		date: "1404/1/22",
		panelName: "پنل شیارز",
		technicalDetails: {
			capacity: 5.2,
			todayProduction: 12.3,
			efficiency: 92,
		},
		address: "تهران، شیارز، خیابان اصلی، پلاک 123",
		owner: "حافظ شیرازی"
	},
	{
		id: "2",
		text: "سرویس سالانۀ پنل اهواز",
		date: "1404/1/23",
		panelName: "پنل اهواز",
		technicalDetails: {
			capacity: 4.8,
			todayProduction: 10.5,
			efficiency: 88,
		},
		address: "اهواز، خیابان آزادی، پلاک 456",
		owner: "حیرون خیرون"
	},
	{
		id: "3",
		text: "تمیزکاری پنل بیرجند",
		date: "1404/1/24",
		panelName: "پنل بیرجند",
		technicalDetails: {
			capacity: 3.5,
			todayProduction: 8.2,
			efficiency: 85,
		},
		address: "بیرجند، خیابان امام، پلاک 789",
		owner: "رضا نصیری اقدم"
	},
]

export default function Page() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<CorpRepairItem | null>(null);

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

			<div>
				<div className="flex flex-col neu-container">
					{repairItems.map((item) => (
						<div 
							key={item.id} 
							onClick={() => handleOpenDialog(item)}
							className="cursor-pointer"
						>
							<CorpRepairCard
								panelName={item.panelName}
								technicalDetails={item.technicalDetails}
								owner={item.owner}
								date={item.date}
								address={item.address}
								className="w-full"
							/>
						</div>
					))}
				</div>
			</div>

			<CorpRepairDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				repairItem={selectedItem}
			/>
		</div>
	);
}
