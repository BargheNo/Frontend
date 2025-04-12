import React from 'react';
import TransparentLoading from "@/components/LoadingSpinner/TransparentLoading";

interface LoginButtonProps {
  children: React.ReactNode;
  loading?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children, loading = false }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`flex justify-center mt-8 items-center text-orange-500 text-xl font-semibold gap-2 p-3 w-full justify-self-center rounded-full cursor-pointer shadow-[-4px_-4px_10px_rgba(255,255,255,1),2px_2px_5px_rgba(0,0,0,0.3)]
        duration-300 hover:shadow-[-8px_-8px_20px_rgba(255,255,255,1),4px_4px_10px_rgba(0,0,0,0.3)]
        active:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)]
        ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
    >
      {loading && <TransparentLoading size="sm" />}
      {children}
    </button>
  );
};

export default LoginButton;
