"use client"

// import Layout from "../../layout"
import { useState } from 'react'
import Carousel from '@/components/Slider/Slider';

import CustomerRepairCard from "@/components/Repair/Customer/CustomerRepairCard";
import CustomerRepairRequest from '@/components/Repair/Customer/CustomerRepairRequest';
import RepairDetailsDialog, { RepairItem } from '@/components/Repair/Customer/CustomerRepairDialog';

// Define the repair items with all necessary data
const repairItems: RepairItem[] = [
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
		address: "تهران، شیارز، خیابان اصلی، پلاک 123، ، تکرار، تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکرار تکراذ تکار تکرار تکرار تکرار تکرار تکرتکاتاکتنبیب خرنبیخرنسخح رنبیرخحنب یرخحنبیر خحنب یرخحنبیر خحبنیرخحبنیرخحیبنر خحنیرخحبنیرخح نبخحنرسخب ینرسبخح رنسیخحرنسبخح نرخسبحرنس بخرنس بخحرنسب خحرنب سخحرنسب خحرنبس رخ"
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
		address: "اهواز، خیابان آزادی، پلاک 456"
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
		address: "بیرجند، خیابان امام، پلاک 789"
	},
	{
		id: "4",
		text: "بستن پیچهای پنل اراک",
		date: "1404/1/25",
		panelName: "پنل اراک",
		technicalDetails: {
			capacity: 6.0,
			todayProduction: 14.1,
			efficiency: 90,
		},
		address: "اراک، خیابان شریعتی، پلاک 321"
	}
];

// Items for the slider (simplified version)
const sliderItems = repairItems.map(item => ({
	text: item.text,
	date: item.date
}));

const Page = () => {
	// State for the dialog
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<RepairItem | null>(null);

	// Function to open the dialog with a selected item
	const handleOpenDialog = (item: RepairItem) => {
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
				تعمیرات پیش رو
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
						<div key={item.id || index} onClick={() => handleOpenDialog(item)}>
							<CustomerRepairCard
								panelName={item.panelName || ""}
								technicalDetails={item.technicalDetails || {
									capacity: 0,
									todayProduction: 0,
									efficiency: 0,
								}}
								address={item.address || ""}
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
