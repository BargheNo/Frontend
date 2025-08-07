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
	totalPages,
}: {
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	totalPages: number;
}) {
	const range = Array.from(
		{ length: 5 },
		(_, i) => i + currentPage - 2
	).filter((page) => page > 1 && page < totalPages);
	return totalPages !== 1 ? (
		<div className="p-5 rtl">
			<Pagination className="lg:mb-0 mb-20 relative">
				<PaginationContent>
					{/* previous */}
					{currentPage !== 1 && (
						<PaginationItem>
							{Number(currentPage) > 1 && (
								<PaginationPrevious
									onClick={() =>
										setCurrentPage((prev: number) =>
											Math.max(Number(prev) - 1, 1)
										)
									}
								/>
							)}
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationLink
							onClick={() => setCurrentPage(1)}
							isActive={1 === currentPage}
						>
							{1}
						</PaginationLink>
					</PaginationItem>
					{/* 3 dots */}
					{currentPage > 4 && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					{/* center pages */}
					{range.map((page) => (
						<PaginationItem key={page}>
							<PaginationLink
								onClick={() => setCurrentPage(page)}
								isActive={page === currentPage}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					))}
					{/* 3 dots */}
					{currentPage < totalPages - 3 && (
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					)}
					<PaginationItem>
						<PaginationLink
							onClick={() => setCurrentPage(totalPages)}
							isActive={totalPages === currentPage}
						>
							{totalPages}
						</PaginationLink>
					</PaginationItem>
					{/* next */}
					{currentPage !== totalPages && (
						<PaginationItem>
							<PaginationNext
								onClick={() =>
									setCurrentPage(
										(prev: number) => Number(prev) + 1
									)
								}
							/>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	) : (
		<></>
	);
}
