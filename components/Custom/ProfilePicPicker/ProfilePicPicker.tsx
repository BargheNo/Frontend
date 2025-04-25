import { User, Plus, X } from "lucide-react";
import Image from "next/image";

interface ProfilePicPickerProps {
  previewImage: string | null;
  existingImage?: string | null;
  isEditable?: boolean;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: File | null) => void) => void;
  onRemoveImage?: () => void;
  setFieldValue: (field: string, value: File | null) => void;
  size?: 'small' | 'large';
}

const ProfilePicPicker: React.FC<ProfilePicPickerProps> = ({
  previewImage,
  existingImage,
  isEditable = true,
  onImageChange,
  onRemoveImage,
  setFieldValue,
  size = 'large'
}) => {
  const containerSize = size === 'large' ? 'w-44 h-44' : 'w-32 h-32';
  const iconSize = size === 'large' ? 'w-20 h-20' : 'w-16 h-16';

  return (
    <div className="relative">
      <div className={`inset-neu-container ${containerSize} rounded-full flex items-center justify-center overflow-hidden`}>
        {previewImage ? (
          <Image
            src={previewImage}
            alt="Profile"
            height={size === 'large' ? 176 : 128}
            width={size === 'large' ? 176 : 128}
            className="w-full h-full object-cover"
          />
        ) : existingImage ? (
          <Image
            src={existingImage}
            alt="Profile"
            height={size === 'large' ? 176 : 128}
            width={size === 'large' ? 176 : 128}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className={`${iconSize} text-gray-400`} />
        )}
      </div>
      {(previewImage || existingImage) && onRemoveImage && (
        <button
          onClick={onRemoveImage}
          className="!absolute !bottom-0 !left-0 bg-cloud-white cursor-pointer rounded-full !w-fit p-2 cta-neu-button hover:bg-primary-dark transition-colors"
        >
          <X />
        </button>
      )}
      {isEditable && (
        <label
          htmlFor="profileImage"
          className="!absolute !bottom-0 !right-0 bg-cloud-white cursor-pointer rounded-full !w-fit p-2 cta-neu-button hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-5 h-5" />
          <input
            id="profileImage"
            name="profileImage"
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={(e) => onImageChange(e, setFieldValue)}
          />
        </label>
      )}
    </div>
  );
};

export default ProfilePicPicker; 