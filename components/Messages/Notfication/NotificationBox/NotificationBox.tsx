import React, { ReactNode } from "react";

export default function NotificationBox({ children }: { children: ReactNode }) {
	return (
		<div className="w-full border-t-1 md:border-gray-300 border-gray-400 first:border-t-0">
			<div className="flex flex-row justify-between h-full bg-[#F0EDEF] p-4 rtl md:pb-5 pb-28 overflow-hidden relative">
				<div className="flex flex-col justify-between w-full z-10 space-x-0">
					<div className="w-full">{children}</div>
				</div>
				<div className="flex flex-col lg:justify-center justify-end lg:mb-0 -mb-18 gap-2 items-center md:mb-10 md:mr-0 -mr-40 min-w-48">
					<div className="flex flex-col h-full w-2/3 items-center justify-center gap-2 p-5 rounded-2xl bg-[#F0F0F3] shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.8),inset_4px_4px_10px_rgba(0,0,0,0.1)]">
						<span className="text-sm font-medium text-gray-600">
							{"1404-7-9"}
						</span>

						<button className="shadow-md cursor-pointer w-23 rounded-lg bg-fire-orange text-white h-9">
							مدیریت
						</button>
					
					</div>
				</div>
			</div>
		</div>
	);
}
