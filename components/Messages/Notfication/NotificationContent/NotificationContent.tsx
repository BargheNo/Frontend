// NotificationContent.tsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function NotificationContent({description, ...props }:{description:string}) {
	return (
		<>
			<div className="flex text-gray-700 justify-between mt-6 items-center ">
            <div className="flex items-start text-black">
					<span className="mr-2">
						{description}
					</span>
				</div>
				{/* <div className="flex items-start text-black">
					<span className="mr-2">
						{"NAMEEEEEEE"}
					</span>
				</div> */}
			</div>


		</>
	);
}
