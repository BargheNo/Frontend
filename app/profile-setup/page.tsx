// app/profile-setup/page.tsx
"use client";

import ProfileSetup from "@/components/Profile/ProfileSetup/ProfileSetup";
import Image from "next/image";
import Background from "../../public/signup.jpg"

const page = () => {

  return (
    <div className="w-full">
        <Image
				className="-z-10"
				src={Background}
				alt="Background"
				layout="fill"
				objectFit="cover"
		/>
        <ProfileSetup />
    </div>
  );
};

export default page;