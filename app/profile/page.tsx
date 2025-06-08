// app/profile/page.tsx
"use client";
import { vazir } from "@/lib/fonts";
import UserProfile from "@/components/Profile/ProfilePage/UserProfile";
// import RolesAndPermissions from "@/components/Profile/ProfilePage/RolesAndPermissions";

const Profile = () => {
  return (
    <div className={`${vazir.className} w-full min-h-full flex flex-col gap-8 text-white py-4 md:py-8 px-4 md:px-14 bg-transparent`}>
      <div className="flex flex-col md:flex-row gap-10">
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