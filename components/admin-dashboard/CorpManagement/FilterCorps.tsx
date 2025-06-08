"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface StatusType {
  id: number;
  status: string;
}

interface FilterCorpsProps {
  value: string;
  onChange: (value: string) => void;
}

const statusColors: Record<number, string> = {
  1: "bg-green-500", // تایید شده
  2: "bg-yellow-500", // در انتظار تایید
  3: "bg-orange-500", // معلق
  4: "bg-red-500", // رد شده
  5: "bg-gray-500", // همه
};

export const FilterCorps = ({ value, onChange }: FilterCorpsProps) => {
  const [statuses, setStatuses] = useState<StatusType[]>([]);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch(
          "http://46.249.99.69:8080/v1/admin/corporation/status",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch statuses");
        }

        const data = await response.json();
        setStatuses(data.data);
      } catch (err) {
        console.error("Error fetching statuses:", err);
      }
    };

    fetchStatuses();
  }, [accessToken]);

  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger dir="rtl" className="bg-[#F4F1F3] w-48 cursor-pointer">
        <SelectValue placeholder="وضعیت" />
      </SelectTrigger>
      <SelectContent dir="rtl">
        {statuses.map((status) => (
          <SelectItem
            key={status.id}
            value={status.id.toString()}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <div
                className={`h-3 w-3 rounded-full ${statusColors[status.id]}`}
              />
              <span>{status.status}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
