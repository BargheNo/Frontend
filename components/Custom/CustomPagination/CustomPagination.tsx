import React from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
export default function CustomPagination({
	currentPage,
	setCurrentPage,
}: {
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<div className="p-5 rtl">
			<Pagination className="lg:mb-0 mb-20 relative">
				<PaginationContent>
					<PaginationItem>
						{Number(currentPage) > 1 && (
							<PaginationPrevious
								href="#"
								onClick={() =>
									setCurrentPage((prev: number) =>
										Math.max(Number(prev) - 1, 1)
									)
								}
							/>
						)}
					</PaginationItem>
					{[1, 2, 3].map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								href="#"
								onClick={() => setCurrentPage(page)}
								isActive={page === currentPage}
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
							onClick={() =>
								setCurrentPage(
									(prev: number) => Number(prev) + 1
								)
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
