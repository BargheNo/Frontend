"use client";
import Header from "@/components/Header/Header";
import { getData } from "@/src/services/apiHub";
import React, { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
import styles from "./styles.module.css";
import {
    CalendarDays,
    CircleDollarSign,
    Eclipse,
    MapPin,
    Building2,
    Route,
    Mail,
    Home,
    DoorOpen,
    Gauge,
    Building,
} from "lucide-react";

import wordExpression from "@/src/functions/Calculations";
import FilterSection from "../FilterSection/FilterSection";
import CustomPagination from "../Custom/CustomPagination/CustomPagination";
import IconWithBackground from "../IconWithBackground/IconWithBackground";
import NoRecordFound from "../NoRecordFound/NoRecordFound";
import OrderBidCard from "./OrderBidCard";

interface Panel {
    id: number;
    name: string;
    status: string;
    buildingType: string;
    area: number;
    power: number;
    tilt: number;
    azimuth: number;
    totalNumberOfModules: number;
    guaranteeStatus: string;
    corporation: Corporation;
    address: Address;
    guarantee: Guarantee;
}

interface Corporation {
    id: number;
    name: string;
    logo: string;
    status: string;
    contactInfo: any[]; // adjust type if you know the structure
    addresses: any[]; // adjust type if you know the structure
}

interface Address {
    id: number;
    province: string;
    provinceID: number;
    cityID: number;
    city: string;
    streetAddress: string;
    postalCode: string;
    houseNumber: string;
    unit: number;
}

interface Guarantee {
    id: number;
    name: string;
    status: string;
    guaranteeType: string;
    durationMonths: number;
    description: string;
    terms: any | null; // adjust type if you know the structure
}

export default function PanelDetails({ id }: { id: string }) {
    const [panel, setPanel] = useState<Panel>();
    const [loading, setLoading] = useState<boolean>(true);
    const fetchPanelDetails = useCallback(() => {
        setLoading(true);
        getData({ endPoint: `/v1/user/installation/panel/${id}` })
            .then((data) => {
                console.log(data?.data);
                setPanel(data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [id]);
    useEffect(() => {
        fetchPanelDetails();
    }, [fetchPanelDetails]);
    return loading ? (
        <LoadingSpinner />
    ) : (
        <>
            <Header header="جزئیات پنل" />
            <div className="relative neu-container p-4 flex flex-col gap-4">
                <div
                    className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} h-fit`}
                >
                    <h3 className="font-bold text-xl text-blue-800">
                        اطلاعات کلی
                    </h3>
                    <div className="space-y-4 p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex gap-2">
                                <Eclipse className="text-orange-400" />
                                <strong>نام پنل:</strong>
                                <p>{panel?.name}</p>
                            </div>
                            <div className="flex gap-2">
                                <div
                                    className={`h-4 w-4 flex place-self-center rounded-full ${
                                        panel?.status === "سپرده شده"
                                            ? "green"
                                            : panel?.status === "فعال"
                                            ? "yellow"
                                            : panel?.status === "منقضی"
                                            ? "orange"
                                            : "red"
                                    }-status shadow-md`}
                                />
                                <strong>وضعیت:</strong>
                                <p>{panel?.status}</p>
                            </div>
                            <div className="flex gap-2">
                                <Building className="text-orange-400" />
                                <strong>نوع ساختمان:</strong>
                                <p>{panel?.buildingType}</p>
                            </div>
                            <div className="flex gap-2">
                                <Gauge className="text-orange-400" />
                                <strong>درخواست توان:</strong>
                                <p>
                                    {
                                        wordExpression(
                                            panel?.powerRequest ?? "",
                                            true
                                        ).value
                                    }
                                    W
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <CircleDollarSign className="text-orange-400" />
                                <strong>حداکثر هزینه:</strong>
                                <p>
                                    {
                                        wordExpression(
                                            panel?.maxCost ?? "",
                                            false
                                        ).value
                                    }
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <CalendarDays className="text-orange-400" />
                                <strong>تاریخ ایجاد:</strong>
                                <p>
                                    {new Date(
                                        String(panel?.createdTime)
                                    ).toLocaleDateString("fa-IR")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`flex flex-col gap-4 p-4 rounded-lg rtl ${styles.shadow} h-fit`}
                >
                    <h3 className="font-bold text-xl text-blue-800">آدرس</h3>
                    <div className="space-y-4 p-4 grid grid-cols-2 gap-4">
                        <div className="flex gap-2">
                            <MapPin className="text-orange-400" />
                            <strong>استان:</strong>
                            <p>{panel?.address.province}</p>
                        </div>
                        <div className="flex gap-2">
                            <Building2 className="text-orange-400" />
                            <strong>شهر:</strong>
                            <p>{panel?.address.city}</p>
                        </div>
                        <div className="flex gap-2">
                            <Route className="text-orange-400" />
                            <strong>خیابان:</strong>
                            <p>{panel?.address.streetAddress}</p>
                        </div>
                        <div className="flex gap-2">
                            <Mail className="text-orange-400" />
                            <strong>کد پستی:</strong>
                            <p>{panel?.address.postalCode}</p>
                        </div>
                        <div className="flex gap-2">
                            <Home className="text-orange-400" />
                            <strong>پلاک:</strong>
                            <p>{panel?.address.houseNumber}</p>
                        </div>
                        <div className="flex gap-2">
                            <DoorOpen className="text-orange-400" />
                            <strong>واحد:</strong>
                            <p>{panel?.address.unit}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
