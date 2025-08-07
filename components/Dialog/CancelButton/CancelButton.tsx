import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import React from "react";

export default function CancelButton() {
	return (
		<DialogClose asChild>
			<Button variant="outline" className="bg-gray-300 cursor-pointer">
				انصراف
			</Button>
		</DialogClose>
	);
}
