import React from "react";

interface ProfileCardProps {
  imageSrc?: string;
  name: string;
  role: string;
  roleIcon: string;
  onEdit: () => void;
  onDelete: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  imageSrc,
  name,
  role,
  roleIcon,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-700 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-lg font-bold text-white">{name}</p>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <span className="material-icons">{roleIcon}</span> {role}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;