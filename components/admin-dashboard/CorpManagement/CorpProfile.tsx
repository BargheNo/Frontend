"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  School,
  IdCard,
  CreditCard,
  Phone,
  Building2,
  StretchHorizontal,
  Building,
  Mail,
  BellRing,
  DoorClosed,
  User,
  ContactRound,
  Newspaper,
} from "lucide-react";
import CustomToast from "@/components/Custom/CustomToast/CustomToast";
import { useSelector } from "react-redux";
import styles from '../CorpManagement/CorpMnagement.module.css'
import { postData } from "@/src/services/apiHub";

interface CorporationDetailType {
  id: number;
  name: string;
  registrationNumber: string;
  nationalID: string;
  iban: string;
  logo: string;
  vatTaxpayerCertificate: string;
  officialNewspaperAD: string;
  signatories: Array<{
    id: number;
    name: string;
    nationalCardNumber: string;
    position: string;
  }>;
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
    city: string;
    streetAddress: string;
    postalCode: string;
    houseNumber: string;
    unit: number;
  }>;
}

interface CorpProfileProps {
  corporationId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (id: number, status: "accept" | "reject" | "suspend") => void;
}

const CorpProfile = ({
  corporationId,
  open,
  onOpenChange,
  onStatusChange,
}: CorpProfileProps) => {
  const [corporation, setCorporation] = useState<CorporationDetailType | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  useEffect(() => {
    if (open && corporationId) {
      fetchCorporationDetails();
    }
  }, [open, corporationId]);

  const fetchCorporationDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://46.249.99.69:8080/v1/admin/corporation/${corporationId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch corporation details");
      }

      const data = await response.json();
      setCorporation(data.data);
    } catch (err: any) {
      CustomToast(
        err.message || "مشکلی در دریافت اطلاعات شرکت رخ داد.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
  
  postData({
    endPoint: `/v1/admin/corporation/${corporationId}/approve`,
    data: {},
  })
    .then((data) => {
      CustomToast(data?.message, "success");
      onOpenChange(false);
      fetchCorporationDetails();
    })
};

const handleReject = async () => {
  postData({
    endPoint: `/v1/admin/corporation/${corporationId}/reject`,
    data: { action: 2 },
  })
    .then((data) => {
      CustomToast(data?.message, "success");
      onOpenChange(false);
      fetchCorporationDetails();
    })
};

const handleSuspend = async () => {
  postData({
    endPoint: `/v1/admin/corporation/${corporationId}/reject`,
    data: { action: 3 },
  })
    .then((data) => {
      CustomToast(data?.message, "success");
      onOpenChange(false);
      fetchCorporationDetails();
    })
};
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-orange-500" size={32} />
          </div>
        ) : corporation ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-right text-2xl text-blue-800">
                مشخصات شرکت
              </DialogTitle>
            </DialogHeader>

            {/* General Information */}
            <div className={`flex flex-row justify-between gap-4 p-4 rounded-lg mb-4 rtl ${styles.shadow} min-h-40`}>
              <div className="flex flex-col justify-between items-start">
                <div className="flex flex-row gap-2">
                  <div className="text-orange-400">
                    <School />
                  </div>
                  <p className="text-2xl">{corporation.name}</p>
                  <p className="text-sm text-gray-500 py-4">
                    <span className="font-semibold">شماره ثبت:</span>{" "}
                    {corporation.registrationNumber}
                  </p>
                </div>
                <div className="flex flex-row gap-10">
                  <div className="flex flex-row gap-2">
                    <div className="text-orange-400">
                      <IdCard />
                    </div>
                    <p>
                      <span className="font-semibold">شناسه ملی:</span>{" "}
                      {corporation.nationalID}
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <div className="text-orange-400">
                      <CreditCard />
                    </div>
                    <p>
                      <span className="font-semibold">شماره شبا:</span>{" "}
                      {corporation.iban}
                    </p>
                  </div>
                </div>
              </div>
              {corporation.logo ? (
                <img
                  src={corporation.logo}
                  alt={`${corporation.name} logo`}
                  className="w-20 h-20 rounded-full border border-orange-400"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-orange-400">
                  <span className="text-gray-500 text-xs">لوگو</span>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} min-h-40`}>
              <h3 className="font-bold text-xl text-blue-800">اطلاعات تماس</h3>
              {corporation.contactInfo.length > 0 ? (
                corporation.contactInfo.map((contact) => (
                  <div key={contact.id} className="flex gap-2">
                    <div className="text-orange-400">
                      <Phone />
                    </div>
                    <span className="font-semibold">
                      {contact.contactType.name}:
                    </span>
                    <span>{contact.value}</span>
                  </div>
                ))
              ) : (
                <p>اطلاعات تماس موجود نیست</p>
              )}
            </div>

            {/* Addresses */}
            <div className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} min-h-40`}>
              <h3 className="font-bold text-xl text-blue-800">آدرس‌ها</h3>
              {corporation.addresses.length > 0 ? (
                corporation.addresses.map((address) => (
                  <div key={address.id} className="flex flex-col gap-1">
                    <div className="flex flex-row ">
                      <div className="flex flex-row w-1/3 gap-1 ">
                        <div className="text-orange-400">
                          <Building2 />
                        </div>
                        <p>
                          <span className="font-semibold">استان:</span>{" "}
                          {address.province}
                        </p>
                      </div>
                      <div className="flex flex-row w-1/3 gap-1">
                        <div className="text-orange-400">
                          <Building />
                        </div>
                        <p>
                          <span className="font-semibold">شهر:</span>{" "}
                          {address.city}
                        </p>
                      </div>
                      <div className="flex flex-row w-1/3 gap-1 ">
                        <div className="text-orange-400">
                          <StretchHorizontal />
                        </div>
                        <p>
                          <span className="font-semibold">خیابان:</span>{" "}
                          {address.streetAddress}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <div className="flex flex-row w-1/3 gap-1 ">
                        <div className="text-orange-400">
                          <Mail />
                        </div>
                        <p>
                          <span className="font-semibold">کد پستی:</span>{" "}
                          {address.postalCode}
                        </p>
                      </div>
                      <div className="flex flex-row w-1/3 gap-1">
                        <div className="text-orange-400">
                          <DoorClosed />
                        </div>
                        <p>
                          <span className="font-semibold">پلاک:</span>{" "}
                          {address.houseNumber}
                        </p>
                      </div>
                      <div className="flex flex-row w-1/3 gap-1 ">
                        <div className="text-orange-400">
                          <BellRing />
                        </div>
                        <p>
                          <span className="font-semibold">واحد:</span>{" "}
                          {address.unit}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>آدرسی ثبت نشده است</p>
              )}
            </div>

            {/* Signatories */}
            <div className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} min-h-40`}>
              <h3 className="font-bold text-xl text-blue-800">امضا کنندگان</h3>
              {corporation.signatories.length > 0 ? (
                corporation.signatories.map((signatory) => (
                  <div key={signatory.id} className="flex flex-row gap-1">
                    <div className="w-1/3 flex flex-row gap-1 ">
                      <div className="text-orange-400">
                        <User />
                      </div>
                      <p>
                        <span className="font-semibold">نام:</span>{" "}
                        {signatory.name}
                      </p>
                    </div>
                    <div className="w-1/3 flex flex-row gap-1">
                      <div className="text-orange-400">
                        <IdCard />
                      </div>
                      <p>
                        <span className="font-semibold">کد ملی:</span>{" "}
                        {signatory.nationalCardNumber}
                      </p>
                    </div>
                    <div className="w-1/3 flex flex-row gap-1">
                      <div className="text-orange-400">
                        <ContactRound />
                      </div>
                      <p>
                        <span className="font-semibold">سمت:</span>{" "}
                        {signatory.position}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>امضا کننده‌ای ثبت نشده است</p>
              )}
            </div>

            {/* Documents */}
            <div className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} min-h-40`}>
              <h3 className="font-bold text-xl text-blue-800">مدارک</h3>
              <div className="flex flex-row gap-4">
                {corporation.vatTaxpayerCertificate && (
                  <div className="w-1/2">
                    <div className="flex flex-row gap-1">
                      <div className="text-orange-400">
                    <Newspaper /></div>
                    <p className="font-semibold mb-2">گواهی ارزش افزوده:</p>
                    </div>
                    
                    <div className=" rounded-lg overflow-hidden">
                      <img
                        src={corporation.vatTaxpayerCertificate}
                        alt="گواهی ارزش افزوده"
                        className="w-full h-auto object-cover max-h-60 rounded-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/document-fallback.png";
                        }}
                      />
                    </div>
                  </div>
                )}
                {corporation.officialNewspaperAD && (
                  <div className="w-1/2">
                    <div className="flex flex-row gap-1">
                      <div className="text-orange-400">
                    <Newspaper /></div>
                    <p className="font-semibold mb-2">آگهی روزنامه رسمی:</p>
                    </div>
                    <div className=" rounded-lg overflow-hidden">
                      <img
                        src={corporation.officialNewspaperAD}
                        alt="آگهی روزنامه رسمی"
                        className="w-full h-auto rounded-lg object-cover max-h-60 "
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/images/document-fallback.png";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="sm:justify-start gap-2">
              
              <Button
                className="bg-green-600 hover:bg-green-700 min-w-30"
                onClick={handleAccept}
              >
                تایید
              </Button>
              <Button className="min-w-30 bg-red-600 hover:bg-red-700" onClick={handleReject}>
                رد
              </Button>
              <Button className="min-w-30 bg-yellow-600 hover:bg-yellow-700" onClick={handleSuspend}>
                معلق
              </Button>
              
            </DialogFooter>
          </>
        ) : (
          <div className="text-center py-8">اطلاعاتی یافت نشد</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CorpProfile;






