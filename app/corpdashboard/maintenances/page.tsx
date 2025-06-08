"use client";
import React, { useEffect, useState } from "react";
import CorpRepairCard from "@/components/Repair/Corp/CorpRepairCard";
import CorpRepairDialog from "@/components/Repair/Corp/CorpRepairDialog";
import { CorpRepairItem } from "@/types/CorpTypes";
import getCorpRepairRecords from "@/src/services/getCorpRepairRecords";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import Header from "@/components/Header/Header";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export default function Page() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<CorpRepairItem | null>(null);
	const [repairItems, setRepairItems] = useState<CorpRepairItem[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [myRepairsFilter, setMyRepairsFilter] = useState<"تایید شده" | "تمام شده" | "همه">("همه");
	const [allRepairsFilter, setAllRepairsFilter] = useState<"در انتظار تایید" | "رد شده" | "همه">("همه");

	useEffect(() => {
		setIsLoading(true);
		getCorpRepairRecords
			.GetRepairRequest()
			.then((res) => {
				console.log(res.data)
				setRepairItems(res.data);
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

	const filteredMyRepairs = repairItems.filter(item => {
		if (myRepairsFilter === "همه") {
			return item.status === "تایید شده" || item.status === "تمام شده";
		}
		return item.status === myRepairsFilter;
	});

	const filteredAllRepairs = repairItems.filter(item => {
		if (allRepairsFilter === "همه") {
			return item.status === "در انتظار تایید" || item.status === "رد شده";
		}
		return item.status === allRepairsFilter;
	});

	return (
		<PageContainer>
			<div className="space-y-8">
				{/* تعمیرات من Section */}
				<div>
					<div className="flex justify-between items-center mb-4">
						<Header header="تعمیرات من" />
						<Select value={myRepairsFilter} onValueChange={(value: "تایید شده" | "تمام شده" | "همه") => setMyRepairsFilter(value)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="فیلتر وضعیت" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="همه">همه</SelectItem>
								<SelectItem value="تایید شده">تایید شده</SelectItem>
								<SelectItem value="تمام شده">تمام شده</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-col neu-container">
						{isLoading ? (
							<LoadingSpinner />
						) : filteredMyRepairs.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								هیچ درخواست تعمیراتی موجود نیست
							</div>
						) : (
							filteredMyRepairs.map((item) => (
								<div key={item.id} className="">
									<CorpRepairCard
										panelName={item.panel.name}
										panelPower={item.panel.power}
										owner={`${item.panel.customer.firstName} ${item.panel.customer.lastName}`}
										date={item.createdAt}
										status={item.status}
										UrgencyLevel={item.urgencyLevel.toLowerCase() as "low" | "medium" | "high"}
										address={item.panel.address.streetAddress}
										className="w-full"
										onDetailsClick={() => handleOpenDialog(item)}
									/>
								</div>
							))
						)}
					</div>
				</div>

				{/* کلیۀ درخواستهای تعمیرات Section */}
				<div>
					<div className="flex justify-between items-center mb-4">
						<Header header="کلیۀ درخواستهای تعمیرات" />
						<Select value={allRepairsFilter} onValueChange={(value: "در انتظار تایید" | "رد شده" | "همه") => setAllRepairsFilter(value)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="فیلتر وضعیت" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="همه">همه</SelectItem>
								<SelectItem value="در انتظار تایید">در انتظار تایید</SelectItem>
								<SelectItem value="رد شده">رد شده</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="flex flex-col neu-container">
						{isLoading ? (
							<LoadingSpinner />
						) : filteredAllRepairs.length === 0 ? (
							<div className="text-center py-8 text-gray-500">
								هیچ درخواست تعمیراتی موجود نیست
							</div>
						) : (
							filteredAllRepairs.map((item) => (
								<div key={item.id} className="">
									<CorpRepairCard
										panelName={item.panel.name}
										panelPower={item.panel.power}
										owner={`${item.panel.customer.firstName} ${item.panel.customer.lastName}`}
										date={item.createdAt}
										status={item.status}
										UrgencyLevel={item.urgencyLevel.toLowerCase() as "low" | "medium" | "high"}
										address={item.panel.address.streetAddress}
										className="w-full"
										onDetailsClick={() => handleOpenDialog(item)}
									/>
								</div>
							))
						)}
					</div>
				</div>
			</div>

			{isDialogOpen && (
				<CorpRepairDialog
					isOpen={isDialogOpen}
					onClose={handleCloseDialog}
					repairItem={selectedItem}
				/>
			)}
		</PageContainer>
	);
}
