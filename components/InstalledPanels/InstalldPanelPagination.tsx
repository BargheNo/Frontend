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
import { useSelector } from "react-redux";
// import { RootState } from "@/src/store/types";

export default function InstalledPanelPagination() {
	const [history, sethistory] = useState<installedpanel[]>([]);
	const [currpage, Setcurrpage] = useState<string>("1");
	const accessToken = useSelector(
		(state: RootState) => state.user.accessToken
	);
	const handelHistory = (page: string, pageSize: string) => {
		InstalledpanelService
			.GetInstalledPanels({ page: page, pageSize: pageSize }, "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDY4MzAxMjYsImlhdCI6MTc0NDIzODEyNiwic3ViIjoxOH0.BydUQtEtMNHdaNUnBiY5IYzAvrccOaIVrL5_JKDNzkqPRVI903PsTJWKGDHfK-boiY_vrh-OBy5Bb7n-MNF8uFD0bEXgiioKb3n9mnnhXDY9nmUkFnyHcUt3Fw1xsvyX4mnKCr7EDMtYP3_PzAMXtfs9hogSOs2JG6PFAWf5oFg")
			.then((res) => {
				sethistory(res.data.data);
				console.log(res)
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		handelHistory(currpage, "3");
	}, [currpage]);

	return (
		<>
			{history?.length > 0 ? (
				history.map((order: installedpanel, index) => (
					<InstalledPanel
						key={index}
						customerName={order.customerName}
						panelName={order.panelName}
						power={order.power}
						address={order.address}
					/>
					
				))
			) : (
				<div className="text-center place-items-center mt-6">
					<Image className="w-1/3" src={panelNotFound} alt="orderNotFound"/>
					<div className="-mt-8">
						<p className=" mt-6 text-navy-blue font-bold rtl" style={{fontSize:"1.1rem"}}>هیچ پنلی یافت نشد.</p>
					</div>
				</div>
			)}
			{history?.length>0&&
			<div className="p-5">
			<Pagination className="mt-4">
				<PaginationContent>
					<PaginationItem>
						{Number(currpage)>1&&
						<PaginationPrevious
							href="#"
							onClick={() =>
								Setcurrpage((prev) => String(Math.max(Number(prev) - 1, 1)))
							}
						/>
                        }
					</PaginationItem>
					{["1", "2", "3"].map((page) => (
						<PaginationItem key={page} >
							<PaginationLink
							   isActive={page===currpage}
								href="#"
								onClick={() => Setcurrpage(page)}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={() => Setcurrpage((prev) => String(Number(prev) + 1))}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
			</div>
            }
		</>
	);
}
