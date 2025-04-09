import React from "react";

export default function Header({ header }: { header: string }) {
	return (
		<h1 className="text-[#003a8b] text-3xl mb-6 font-black w-full">{header}</h1>
	);
}
