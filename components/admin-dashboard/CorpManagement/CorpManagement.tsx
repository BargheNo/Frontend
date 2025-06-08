"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Loader2, Settings, Phone, MapPinHouse } from "lucide-react";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { useSelector } from "react-redux";
import { FilterCorps } from "./FilterCorps";

interface CorporationType {
  id: number;
  name: string;
  logo: string;
  contactInfo: Array<{
    id: number;
    contactType: {
      id: number;
      name: string;
    };
    value: string;
  }>;
  addresses: Array<{
    id: number;
    province: string;
    provinceID: number;
    cityID: number;
    city: string;
    streetAddress: string;
    postalCode: string;
    houseNumber: string;
    unit: number;
  }>;
}

const CorporationItem = React.memo(
  ({
    name,
    logo,
    contactInfo,
    addresses,
    id,
    onManage,
  }: CorporationType & {
    onManage: (id: number) => void;
  }) => {
    return (
      <div className="flex flex-row justify-between w-full h-full bg-[#F4F1F3] p-5 overflow-hidden relative border-t-1 border-gray-300 first:border-t-0 items-center">
        <div className="flex items-center gap-3 w-1/4">
          {logo ? (
            <img
              src={logo}
              alt={`${name} logo`}
              className="w-10 h-10 rounded-full border border-orange-400"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center border-2 border-orange-400`}
            >
              <span className="text-gray-500 text-xs">لوگو</span>
            </div>
          )}
          <p className="font-medium">{name}</p>
        </div>

        <div className="flex items-center gap-3 w-1/4">
          <div className="text-orange-400">
            <Phone />
          </div>
          <p>اطلاعات تماس: {contactInfo.length > 0 ? "دارد" : "ندارد"}</p>
        </div>

        <div className="flex items-center gap-3 w-1/4">
          <div className="text-orange-400">
            <MapPinHouse />
          </div>
          <p>آدرس: {addresses.length > 0 ? "دارد" : "ندارد"}</p>
        </div>

        <button
          className={`text-orange-400 flex gap-2 items-center p-2 hover:cursor-pointer border border-orange-400 rounded-md`}
          onClick={() => onManage(id)}
        >
          <p className="font-bold">جزئیات بیشتر و مدیریت</p>
          <Settings size={16} />
        </button>
      </div>
    );
  }
);

const CorpManagement = () => {
  const [corporations, setCorporations] = useState<CorporationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("5");
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const fetchAllCorporations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/corporation?status=${filterStatus}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch corporations");
      }

      const data = await response.json();
      setCorporations(data.data);
    } catch (err: any) {
      const errMsg = err.message || "مشکلی در دریافت لیست شرکت‌ها رخ داد.";
      CustomToast(errMsg, "error");
    } finally {
      setLoading(false);
    }
  }, [accessToken, filterStatus]);

  useEffect(() => {
    fetchAllCorporations();
  }, [fetchAllCorporations]);

  const handleManageCorporation = (id: number) => {
    console.log("Manage corporation with id:", id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-8 my-10 py-2 border-b w-70 border-blue-800">
        <h1 className="text-3xl text-blue-800">شرکت های فعلی</h1> 
      </div>
      <div className="p-5"><FilterCorps value={filterStatus} onChange={setFilterStatus} /></div>
      

      <div className="flex flex-col w-full">
        {corporations.map((corporation) => (
          <CorporationItem
            key={corporation.id}
            {...corporation}
            onManage={handleManageCorporation}
          />
        ))}
      </div>
    </div>
  );
};

export default CorpManagement;