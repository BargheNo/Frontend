"use client"

// import Layout from "../../layout"
import { useState, useEffect } from 'react'
import Carousel from '@/components/Slider/Slider';

import CustomerRepairCard from "@/components/Repair/Customer/CustomerRepairCard";
import CustomerRepairRequest from '@/components/Repair/Customer/CustomerRepairRequest';
import RepairDetailsDialog from '@/components/Repair/Customer/CustomerRepairDialog';

import { baseURL, getData } from '@/src/services/apiHub';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { toast } from 'sonner';

// Mock data for testing
const mockRepairItems: RepairHistoryItem[] = [
    {
        ID: 1,
        Subject: "تعمیر پنل خورشیدی شماره 1",
        Description: "پنل خورشیدی نیاز به تعمیر و نگهداری دارد",
        Status: "در انتظار",
        UrgencyLevel: "بالا",
        CreatedAt: "2024-03-15T10:30:00Z",
        OwnerID: 1,
        CorporationID: 1,
        PanelID: 1,
        Panel: {
            id: 1,
            panelName: "پنل A1",
            corporationName: "شرکت انرژی خورشیدی",
            power: 400,
            area: 2.5
        }
    },
    {
        ID: 2,
        Subject: "بازرسی دوره‌ای پنل‌ها",
        Description: "نیاز به بازرسی دوره‌ای پنل‌های خورشیدی",
        Status: "در حال انجام",
        UrgencyLevel: "متوسط",
        CreatedAt: "2024-03-10T14:20:00Z",
        OwnerID: 1,
        CorporationID: 1,
        PanelID: 2,
        Panel: {
            id: 2,
            panelName: "پنل B2",
            corporationName: "شرکت انرژی خورشیدی",
            power: 350,
            area: 2.0
        }
    },
    {
        ID: 3,
        Subject: "تعویض اینورتر",
        Description: "اینورتر نیاز به تعویض دارد",
        Status: "تکمیل شده",
        UrgencyLevel: "بالا",
        CreatedAt: "2024-02-28T09:15:00Z",
        OwnerID: 1,
        CorporationID: 1,
        PanelID: 3,
        Panel: {
            id: 3,
            panelName: "پنل C3",
            corporationName: "شرکت انرژی خورشیدی",
            power: 450,
            area: 3.0
        }
    }
];

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
	const [selectedItem, setSelectedItem] = useState<RepairHistoryItem | null>(null);
	const [repairItems, setRepairItems] = useState<RepairHistoryItem[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	// Function to filter repairs simce the last month
	const getRecentRepairs = (items: RepairHistoryItem[]) => {
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
		
		return items.filter(item => {
			const repairDate = new Date(item.CreatedAt);
			return repairDate >= oneMonthAgo;
		});
	};

	useEffect(() => {		
		// Comment out the API call for now and use mock data
		/* ////////////////////////////////////////////////////////////////////////////////////
		getData({
			endPoint: `${baseURL}/v1/user/maintenance/request/list`,
		})
		.then((res) => {
			setRepairItems(res.data);
			setIsLoading(false);
		})
		.catch((err) => {
			setError(err instanceof Error ? err : new Error('Failed to fetch repair items'));
			setIsLoading(false);
		});
		*/ ///////////////////////////////////////////////////////////////////////////////////

		// Use mock data instead
		setRepairItems(mockRepairItems);
		setIsLoading(false);
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
		date: item.CreatedAt
	}));

	if (isLoading) {
		return (
			<LoadingSpinner />
		);
	}

	if (error) {
		// toast.error("مشکلی در دریافت سوابق تعمیرات پیش آمد!");
		// console.log(error.message);
		return (
			<div className="min-h-[90vh] w-full flex items-center justify-center">
				<div className="w-3xl flex flex-col items-center justify-center rounded-2xl text-center space-y-2 sm:space-y-2 place-items-center py-6 sm:py-10 relative z-20 bg-gradient-to-br from-[#EBECF0] to-[#EFF0F2] neu-container">
					<p dir='ltr' className='text-navy-blue text-2xl sm:text-5xl font-black'>¯\_(ツ)_/¯</p>
					<p className="mt-4 sm:mt-6 text-navy-blue text-2xl sm:text-3xl font-bold rtl">مشکلی پیش آمد!</p>
					<p className='mt-4'>{error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-full w-full flex flex-col gap-8 text-white py-8 px-3 md:px-14 bg-transparent" dir='rtl'>
			<h1 className="text-navy-blue text-3xl font-black">
				درخواست تعمیرات
			</h1>
			<div className="flex flex-col-reverse md:flex-row">
				{sliderItems.length > 0 ? (
					<>
						<div className="w-full md:w-[60%] h-60 items-center content-center">
							<Carousel 
								items={sliderItems} 
								onItemClick={(index: number) => handleOpenDialog(recentRepairs[index])}
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
				<h1 className="text-navy-blue text-3xl mb-6 font-black">
					سوابق تعمیرات
				</h1>
				<div className="flex flex-col neu-container">
					{repairItems.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							هیچ سابقه تعمیراتی موجود نیست
						</div>
					) : (
						repairItems.map((item: RepairHistoryItem, index: number) => (
							<div key={item.ID || index}>
								<CustomerRepairCard
									repairItem={item}
									onDetailsClick={() => handleOpenDialog(item)}
								/>
							</div>
						))
					)}
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
