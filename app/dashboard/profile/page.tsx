// app/profile/page.tsx
"use client";
import { useEffect, useState } from "react";
import { vazir } from "@/lib/fonts";
import { baseURL, getData } from "@/src/services/apiHub";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import UserProfile, { ProfileData } from "@/components/Profile/ProfilePage/UserProfile";
import RolesAndPermissions from "@/components/Profile/ProfilePage/RolesAndPermissions";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: File | null) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue("profilePic", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await getData({endPoint: `${baseURL}/v1/user/profile`});
      console.log(response.data);
      setProfileData(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast("خطا در دریافت اطلاعات پروفایل");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (values: ProfileData) => {
    try {
      if (!isEditable) {
        setIsEditable(true);
        return;
      }
      // TODO: Implement updateProfile function
      // await updateProfile(values);
      setProfileData(values);
      setIsEditable(false);
      toast.success("اطلاعات با موفقیت بروزرسانی شد");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("خطا در بروزرسانی اطلاعات");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!profileData) {
    return null;
  }

  return (
    <div className={`${vazir.className} w-full min-h-full flex flex-col gap-8 text-white py-4 md:py-8 px-4 md:px-14 bg-transparent`}>
      <div className="flex flex-col md:flex-row gap-10">
        <UserProfile
          profileData={profileData}
          isEditable={isEditable}
          previewImage={previewImage}
          setIsEditable={setIsEditable}
          setPreviewImage={setPreviewImage}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
        />
        <RolesAndPermissions
          profileData={profileData}
          isEditable={isEditable}
        />

        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Profile;