import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export default function NeuFrame({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "neo-card p-3 rounded-xl flex justify-center items-center",
        className
      )}
    >
      <div
        className={cn("rounded-xl flex-1 relative w-full h-full")}
      >
        <div className="absolute no-scrollbar overflow-y-auto top-0 left-0 right-0 bottom-0 rounded-xl">
          {children}
        </div>
        <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_-4px_-4px_5px_rgba(255,255,255,0.4),inset_4px_4px_5px_rgba(0,0,0,0.3)] z-20"></div>
      </div>
    </div>
  );
}
