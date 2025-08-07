"use client";
import panelNotFound from "../../public/images/panelNotFound/panelNotFound.png";
import Image from "next/image";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import InstalledpanelService from "@/src/services/getInstalledPanelsService";
import { useEffect, useState } from "react";
import { installedpanel } from "@/src/types/installedpanelType";
import InstalledPanel from "@/components/InstalledPanels/InstalledPanels";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../Loading/LoadingSpinner/LoadingSpinner";
import { getData } from "@/src/services/apiHub";
import { setCorpId } from "@/src/store/slices/userSlice";
import Header from "../Header/Header";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import NoRecordFound from "../NoRecordFound/NoRecordFound";

interface status {
	id: number;
	name: string;
}

export default function InstalledPanelPagination() {
	const dispatch = useDispatch();
	const [history, sethistory] = useState<installedpanel[]>([]);
	const [currpage, Setcurrpage] = useState<string>("1");
	const [isLoading, setIsLoading] = useState(true);
	const [statuses, setStatuses] = useState<status[] | null>(null);
	const [status, setStatus] = useState<string>("1");
	const corpId = useSelector((state: RootState) => state.user.corpId);
	const handelHistory = (status: string, offset: string, limit: string) => {
		if (corpId) {
			InstalledpanelService.GetInstalledPanels({
				page: {
					status: status ?? "1",
					offset: offset ?? "1",
					limit: limit ?? "10",
				},
				corpId: corpId,
			})
				.then((res) => {
					sethistory(res.data);
					getData({ endPoint: `/v1/installation/panel/status` })
						.then((data) => {
							setStatuses(data?.data);
						})
						.catch((err) => console.log(err))
						.finally(() => setIsLoading(false));
				})
				.catch((err) => console.log(err));
		} else {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		setIsLoading(true);
		getData({ endPoint: `/v1/user/corps` })
			.then((res) => {
				const corpId = res?.data[0]?.id;
				dispatch(setCorpId(corpId));
				handelHistory(status, currpage, "10");
			})
			.catch((err) => console.log(err));
	}, [currpage, status]);

	return (
		<>
			<div>
				<>
					<div className="flex place-items-center">
						<Header header="پنل‌های نصب‌ شده" />
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
									<SelectValue placeholder="وضعیت پنل" />
								</SelectTrigger>
								<SelectContent dir="rtl">
									{statuses?.map(
										(status: status, index: number) => (
											<SelectItem
												key={index}
												value={String(status.id)}
												className="cursor-pointer"
											>
												{status.name}
											</SelectItem>
										)
									)}
								</SelectContent>
							</Select>
						)}
					</div>

					{isLoading ? (
						<LoadingSpinner />
					) : history?.length > 0 ? (
						<div className="flex flex-col text-white bg-transparent w-full">
							<div className="flex flex-col text-gray-800  rounded-2xl overflow-auto shadow-[-6px_-6px_16px_rgba(255,255,255,0.8),6px_6px_16px_rgba(0,0,0,0.2)]">
								{history.map((order: installedpanel, index) => (
									<InstalledPanel
										key={index}
										customer={order.customer}
										name={order.name}
										power={order.power}
										address={order.address}
									/>
								))}
							</div>
						</div>
					) : (
						<div className="neu-container">
							<NoRecordFound />
						</div>
					)}
				</>
				{history?.length > 0 && (
					<div className="p-5 rtl">
						<Pagination className="lg:mb-0 mb-20">
							<PaginationContent>
								<PaginationItem>
									{Number(currpage) > 1 && (
										<PaginationPrevious
											href="#"
											onClick={() =>
												Setcurrpage((prev) =>
													String(
														Math.max(
															Number(prev) - 1,
															1
														)
													)
												)
											}
										/>
									)}
								</PaginationItem>
								{["1", "2", "3", "4", "5"].map((page) => (
									<PaginationItem key={page}>
										<PaginationLink
											isActive={page === currpage}
											href="#"
											onClick={() => Setcurrpage(page)}
										>
											{page}
										</PaginationLink>
									</PaginationItem>
								))}
								<PaginationItem>
									{currpage != "5" && <PaginationEllipsis />}
								</PaginationItem>
								<PaginationItem>
									{currpage != "5" && (
										<PaginationNext
											href="#"
											onClick={() =>
												Setcurrpage((prev) =>
													String(Number(prev) + 1)
												)
											}
										/>
									)}
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
				)}
			</div>
		</>
	);
}
