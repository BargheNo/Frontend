"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Loader2, Settings, Phone, MapPinHouse } from "lucide-react";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { useSelector } from "react-redux";
import { FilterCorps } from "./FilterCorps";
import CorpProfile from "./CorpProfile";

interface CorporationType {
	id: number;
	name: string;
	logo: string;
	contactInfo: Array<{
		id: number;
		contactType: {
			id: number;
			name: string;
		};
		value: string;
	}>;
	addresses: Array<{
		id: number;
		province: string;
		provinceID: number;
		cityID: number;
		city: string;
		streetAddress: string;
		postalCode: string;
		houseNumber: string;
		unit: number;
	}>;
}

const CorporationItem = React.memo(
	({
		name,
		logo,
		contactInfo,
		addresses,
		id,
		onManage,
	}: CorporationType & {
		onManage: (id: number) => void;
	}) => {
		return (
			<div className="flex flex-row justify-between w-full h-full bg-[#F4F1F3] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-center">
				<div className="flex items-center gap-3 w-1/4">
					{logo ? (
						<img
							src={logo}
							alt={`${name} logo`}
							className="w-10 h-10 rounded-full border border-orange-400"
						/>
					) : (
						<div
							className={`w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-orange-400`}
						>
							<span className="text-gray-500 text-xs">لوگو</span>
						</div>
					)}
					<p className="font-medium">{name}</p>
				</div>

				<div className="flex items-center gap-3 w-1/4">
					<div className="text-orange-400">
						<Phone />
					</div>
					<p>
						اطلاعات تماس:{" "}
						{contactInfo.length > 0 ? "دارد" : "ندارد"}
					</p>
				</div>

				<div className="flex items-center gap-3 w-1/4">
					<div className="text-orange-400">
						<MapPinHouse />
					</div>
					<p>آدرس: {addresses.length > 0 ? "دارد" : "ندارد"}</p>
				</div>

				<button
					className={`text-orange-400 flex gap-2 items-center p-2 hover:cursor-pointer border border-orange-400 rounded-md`}
					onClick={() => onManage(id)}
				>
					<p className="font-bold">مشاهده پروفایل و مدیریت</p>
					<Settings size={16} />
				</button>
			</div>
		);
	}
);

const CorpManagement = () => {
	const [corporations, setCorporations] = useState<CorporationType[]>([]);
	const [loading, setLoading] = useState(false);
	const [filterStatus, setFilterStatus] = useState("5");
	const [selectedCorpId, setSelectedCorpId] = useState<number | null>(null);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);

	const fetchAllCorporations = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`http://46.249.99.69:8080/v1/admin/corporation?status=${filterStatus}`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch corporations");
			}

			const data = await response.json();
			setCorporations(data.data);
		} catch (err: any) {
			const errMsg =
				err.message || "مشکلی در دریافت لیست شرکت‌ها رخ داد.";
			CustomToast(errMsg, "error");
		} finally {
			setLoading(false);
		}
	}, [accessToken, filterStatus]);

	useEffect(() => {
		fetchAllCorporations();
	}, [fetchAllCorporations]);

	const handleManageCorporation = (id: number) => {
		setSelectedCorpId(id);
		setIsProfileOpen(true);
	};

	const handleStatusChange = async (
		id: number,
		status: "accept" | "reject" | "suspend"
	) => {
		try {
			setLoading(true);
			const response = await fetch(
				`http://46.249.99.69:8080/v1/admin/corporation/${id}/status`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${accessToken}`,
					},
					body: JSON.stringify({
						status: status === "accept" ? 1 : 4, // 1 for accepted, 4 for rejected
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update corporation status");
			}

			CustomToast(
				`شرکت با موفقیت ${status === "accept" ? "تایید" : "رد"} شد`,
				"success"
			);
			fetchAllCorporations();
		} catch (err: any) {
			CustomToast(
				err.message || "مشکلی در تغییر وضعیت شرکت رخ داد.",
				"error"
			);
		} finally {
			setLoading(false);
		}
	};

	if (loading && corporations.length === 0) {
		return (
			<div className="flex justify-center items-center h-40">
				<Loader2 className="animate-spin text-orange-500" size={32} />
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<div className="pb-6">
				<FilterCorps value={filterStatus} onChange={setFilterStatus} />
			</div>

			<div className="flex flex-col w-full">
				{corporations.map((corporation) => (
					<CorporationItem
						key={corporation.id}
						{...corporation}
						onManage={handleManageCorporation}
					/>
				))}
			</div>

			{selectedCorpId && (
				<CorpProfile
					corporationId={selectedCorpId}
					open={isProfileOpen}
					onOpenChange={setIsProfileOpen}
					onStatusChange={handleStatusChange}
				/>
			)}
		</div>
	);
};

export default CorpManagement;
