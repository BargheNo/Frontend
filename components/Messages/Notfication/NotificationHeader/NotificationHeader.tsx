// NotificationHeader.tsx
import React from "react";

export default function NotificationHeader({topic}: {topic: string}) 
{
	return (
		<>
			<div className="flex text-gray-700 justify-between items-center">
				<div className="flex items-center text-black">
					<span className="md:text-2xl text-xl font-bold text-gray-800 mr-2 whitespace-nowrap">
						{topic}
					</span>
				</div>
			</div>

			{/* <div className="flex text-gray-700 justify-between mt-6 items-center">
				<div className="flex items-center text-black">
					<span className="text-l text-gray-800 mr-2 whitespace-nowrap">
						{description}
					</span>
				</div>
			</div> */}
		</>
	);
}

