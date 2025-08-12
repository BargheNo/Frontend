// NotificationHeader.tsx
import React from "react";

export default function NotificationHeader({topic,title}: {topic: string,title:string}) 
{
	return (
		<>
			<div className="flex flxe-col mr-2 text-gray-700 items-center justify-between">
				<span className="md:text-2xl text-xl font-bold text-gray-800 mr-2 whitespace-nowrap mt-4">
					{topic}
				</span>
			</div>
            <div className="flex flxe-col mr-2 text-gray-700 items-center">
				<span className="md:text-xl text-l font-bold text-gray-800 mr-2 whitespace-nowrap mt-5 -mb-4">
                {"عنوان اعلان: "}{title}
				</span>
			</div>

		</>
	);
}

