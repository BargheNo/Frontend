"use client"

// import Layout from "../../layout"
import { useState } from 'react'
import Carousel from '@/components/Slider/Slider';

import CustomerRepairCard from "@/components/Repair/Customer/CustomerRepairCard";
import CustomerRepairRequest from '@/components/Repair/Customer/CustomerRepairRequest';
import RepairDetailsDialog from '@/components/Repair/Customer/CustomerRepairDialog';

interface RepairHistoryItem {
	title: string;
	panelName: string;
	panelId: string;
	repairMan: string;
	date: string;
	notes: string;
	status: string;
}

// Define the repair items with the new data structure
const repairItems: RepairHistoryItem[] = [
	{
		title: "تمیزکاری پنل قزوین",
		panelName: "پنل قزوین",
		panelId: "27",
		repairMan: "مرتضی آنالویی",
		date: "1404/2/3",
		notes: "پنل را به خوبی تمیز کردم دریافت شد دریافت شد دریافت شد دریافت شد دریافت شد دریافت شد دریافت شد دریافت شد دریافت شد دریافت شد ",
		status: "done",
	},
	{
		title: "تعمیرات پنل تهران",
		panelName: "پنل تهران",
		panelId: "28",
		repairMan: "علی محمدی",
		date: "1404/2/4",
		notes: "تعویض اینورتر و بررسی عملکرد سیستم",
		status: "in_progress",
	},
	{
		title: "بازرسی فنی پنل اصفهان",
		panelName: "پنل اصفهان",
		panelId: "29",
		repairMan: "رضا حسینی",
		date: "1404/2/5",
		notes: "بررسی کلی سیستم و تعویض قطعات فرسوده",
		status: "pending",
	}
];

// Items for the slider (simplified version)
const sliderItems = repairItems.map(item => ({
	text: item.title,
	date: item.date
}));

const Page = () => {
	// State for the dialog
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<RepairHistoryItem | null>(null);

	// Function to open the dialog with a selected item
	const handleOpenDialog = (item: RepairHistoryItem) => {
		setSelectedItem(item);
		setIsDialogOpen(true);
	};

	// Function to close the dialog
	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setSelectedItem(null);
	};

	return (
		<div className="min-h-full flex flex-col gap-8 text-white py-8 px-14 bg-transparent">
			<h1 className="text-navy-blue text-3xl font-black">
				سوابق تعمیرات
			</h1>
			<div className="flex">
				<div className="w-[60%] h-60 items-center content-center">
					<Carousel 
						items={sliderItems} 
						onItemClick={(index: number) => handleOpenDialog(repairItems[index])}
					/>
				</div>
				<div className="flex flex-col gap-4 w-[40%] items-center align-center justify-center">
					<CustomerRepairRequest />
				</div>
			</div>
			<div>
				<h1 className="text-navy-blue text-3xl mb-6 font-black">
					سوابق تعمیرات
				</h1>
				<div className="flex flex-col neu-container">
					{repairItems.map((item, index) => (
						<div key={item.panelId || index}>
							<CustomerRepairCard
								repairItem={item}
								onDetailsClick={() => handleOpenDialog(item)}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Dialog for displaying repair details */}
			<RepairDetailsDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				repairItem={selectedItem}
			/>
		</div>
	);
};

export default Page;
