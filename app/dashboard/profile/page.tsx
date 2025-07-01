// app/profile/page.tsx
"use client";
import { vazir } from "@/lib/fonts";
import UserProfile from "@/components/Profile/ProfilePage/UserProfile";
// import RolesAndPermissions from "@/components/Profile/ProfilePage/RolesAndPermissions";

const Profile = () => {
  return (
    <div className={`${vazir.className} w-[40vw] mx-auto min-h-full flex flex-col gap-8 text-white py-4 md:py-8 px-4 md:px-14 bg-transparent`}>
      <div className="flex justify-center items-center">
        <UserProfile />
        {/* <RolesAndPermissions
          profileData={profileData}
          isEditable={isEditable}
        /> */}

        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Profile;