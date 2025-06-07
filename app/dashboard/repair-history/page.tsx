"use client";

// import Layout from "../../layout"
import { useState, useEffect } from "react";
import Carousel from "@/components/Slider/Slider";

import CustomerRepairCard from "@/components/Repair/Customer/CustomerRepairCard";
import CustomerRepairRequest from "@/components/Repair/Customer/CustomerRepairRequest";
import RepairDetailsDialog from "@/components/Repair/Customer/CustomerRepairDialog";

import { baseURL, getData } from "@/src/services/apiHub";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";

interface RepairHistoryItem {
	ID: number;
	Subject: string;
	Description: string;
	Status: string;
	UrgencyLevel: string;
	CreatedAt: string;
	OwnerID: number;
	CorporationID: number;
	PanelID: number;
	Panel: {
		id: number;
		panelName: string;
		corporationName: string;
		power: number;
		area: number;
	};
}
const Page = () => {
	// State for the dialog
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<RepairHistoryItem | null>(
		null
	);
	const [repairItems, setRepairItems] = useState<RepairHistoryItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	// Function to filter repairs simce the last month
	const getRecentRepairs = (items: RepairHistoryItem[]) => {
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

		return items.filter((item) => {
			const repairDate = new Date(item.CreatedAt);
			return repairDate >= oneMonthAgo;
		});
	};

	useEffect(() => {
		getData({
			endPoint: `${baseURL}/v1/user/maintenance/request/list`,
		})
			.then((res) => {
				// console.log(res);
				setRepairItems(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(
					err instanceof Error
						? err
						: new Error("Failed to fetch repair items")
				);
				setIsLoading(false);
			});
	}, []);

	const handleOpenDialog = (item: RepairHistoryItem) => {
		setSelectedItem(item);
		setIsDialogOpen(true);
	};

	// Function to close the dialog
	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setSelectedItem(null);
	};

	const recentRepairs = getRecentRepairs(repairItems);
	const sliderItems = recentRepairs.map((item: RepairHistoryItem) => ({
		text: item.Subject,
		date: item.CreatedAt,
	}));

	// if (isLoading) {
	// 	return <LoadingSpinner />;
	// }

	if (error) {
		return (
			<div className="min-h-full flex items-center justify-center text-white py-8 px-14 bg-transparent">
				<p>Error loading repair items: {error.message}</p>
			</div>
		);
	}

	return (
		<PageContainer>
			{/* <div className="min-h-full w-full flex flex-col gap-8 text-white py-8 px-3 md:px-14 bg-transparent" dir='rtl'> */}
			<Header header="درخواست تعمیرات" />
			<div className="flex flex-col-reverse md:flex-row">
				{sliderItems.length > 0 ? (
					<>
						<div className="w-full md:w-[60%] h-60 items-center content-center">
							<Carousel
								items={sliderItems}
								onItemClick={(index: number) =>
									handleOpenDialog(recentRepairs[index])
								}
							/>
						</div>
						<div className="flex flex-col gap-4 w-full md:w-[40%] items-center align-center justify-center mb-8 md:mt-0">
							<CustomerRepairRequest />
						</div>
					</>
				) : (
					<div className="w-full flex justify-center">
						<CustomerRepairRequest />
					</div>
				)}
			</div>
			<div>
				<Header header="سوابق تعمیرات" />
				{isLoading ? (
					<LoadingSpinner />
				) : (
					<div className="flex flex-col neu-container">
						{repairItems.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								هیچ سابقه تعمیراتی موجود نیست
							</div>
						) : (
							repairItems.map(
								(item: RepairHistoryItem, index: number) => (
									<div key={item.ID || index}>
										<CustomerRepairCard
											repairItem={item}
											onDetailsClick={() =>
												handleOpenDialog(item)
											}
										/>
									</div>
								)
							)
						)}
					</div>
				)}
			</div>

			{/* Dialog for displaying repair details */}
			<RepairDetailsDialog
				isOpen={isDialogOpen}
				onClose={handleCloseDialog}
				repairItem={selectedItem}
			/>
			{/* </div> */}
		</PageContainer>
	);
};

export default Page;
