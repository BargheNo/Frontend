"use client";
import { ProfileData } from "./UserProfile";

interface RolesAndPermissionsProps {
  profileData: ProfileData;
  isEditable: boolean;
}

const RolesAndPermissions: React.FC<RolesAndPermissionsProps> = ({
  profileData,
  isEditable,
}) => {
  return (
    <div className="p-6 w-full md:w-1/2 neu-container">
      <h2 className="text-navy-blue text-2xl font-bold mb-6">نقش و دسترسی‌ها</h2>
      
      <div className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-3">
          <h3 className="text-navy-blue text-lg font-semibold">نقش کاربری</h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                className="w-4 h-4 text-primary-dark"
                checked={profileData?.status === "user"}
                disabled={!isEditable}
              />
              <span className="text-gray-700">کاربر عادی</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="notuser"
                className="w-4 h-4 text-primary-dark"
                checked={profileData?.status === "notuser"}
                disabled={!isEditable}
              />
              <span className="text-gray-700">کاربر غیرعادی؟؟؟</span>
            </label>
          </div>
        </div>

        {/* Permissions */}
        <div className="space-y-3">
          <h3 className="text-navy-blue text-lg font-semibold">دسترسی‌ها</h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary-dark rounded"
                checked={profileData?.status === "admin" || profileData?.status === "moderator"}
                disabled={!isEditable}
              />
              <span className="text-gray-700">مدیریت پنل؟</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary-dark rounded"
                checked={true}
                disabled={!isEditable}
              />
              <span className="text-gray-700">درخواست تعمیر؟</span>
            </label>
          </div>
        </div>

        {/* Current Role Display */}
        <div className="mt-6 p-4 bg-warm-white rounded-lg">
          <h3 className="text-navy-blue text-lg font-semibold mb-2">نقش فعلی</h3>
          <p className="text-gray-700">
            {profileData?.status === "admin" && "مدیر سیستم"}
            {profileData?.status === "user" && "کاربر عادی"}
            {profileData?.status === "moderator" && "ناظر"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RolesAndPermissions; 