import Signup from "@/components/Auth/Signup/signup";
import Background from "../../public/signup.jpg";
import Image from "next/image";

function signup() {
	return (
		<div className="">
			<Image
				className="-z-10"
				src={Background}
				alt="Background"
				layout="fill"
				objectFit="cover"
			/>
			<Signup />
		</div>
	);
}

export default signup;
