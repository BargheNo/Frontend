// app/profile/page.tsx
"use client";
import { vazir } from "@/lib/fonts";
import UserProfile from "@/components/Profile/ProfilePage/UserProfile";
import PageContainer from "@/components/Dashboard/PageContainer/PageContainer";
import Header from "@/components/Header/Header";
// import RolesAndPermissions from "@/components/Profile/ProfilePage/RolesAndPermissions";

const Profile = () => {
	return (
		<PageContainer>
      <Header header="پروفایل کاربری" />
			<div
				className={`${vazir.className} w-[40vw] mx-auto min-h-full flex flex-col gap-8 text-white py-4 md:py-8 px-4 md:px-14 bg-transparent relative`}
			>
				<div className="flex justify-center items-center">
					<UserProfile />
					{/* <RolesAndPermissions
          profileData={profileData}
          isEditable={isEditable}
          /> */}
				</div>
			</div>
		</PageContainer>
	);
};

export default Profile;
