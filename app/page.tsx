// import { vazir } from "@/lib/fonts";
// import { ArrowLeft } from "lucide-react";
// import panel from "@/public/images/Landing/panel.png";
// import Link from "next/link";
"use client";
import Landing from "@/components/Landing/Landing";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import useClientCheck from "@/src/hooks/useClientCheck";

// import Image from "next/image";
export default function Page() {
	if (!useClientCheck()) {
		return <LoadingSpinner />;
	}
	return <Landing />;
}
