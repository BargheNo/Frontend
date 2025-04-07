import Image from "next/image";
import panel from "@/public/images/corplanding/6ec5a885-aaf7-4aaf-8266-6026e76e5701.png";
export default function Page() {
	return (
		<div className="bg-white h-screen flex w-screen">
			<div className="flex items-center w-1/2 items-center mx-auto">
				<div className="my-auto flex h-full px-16">
					<Image
						src={panel}
						alt="solar-panel-corp"
						className="my-auto"
					/>
				</div>
			</div>
			<div className="w-1/2 flex items-center mx-auto">
				<span className="vazir-bold text-6xl flex place-self-center place-content-center w-full text-center">در برق نو فروشنده شوید</span>
			</div>
		</div>
	);
}
