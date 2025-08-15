import { getData } from "@/src/services/apiHub";
import React, { useEffect, useState } from "react";
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

interface Order {
    id: number;
    name: string;
    createdTime: string;
    status: string;
    powerRequest: number;
    maxCost: number;
    buildingType: string;
    address: Address;
}

export default function NewOrderDetails({ id }: { id: string }) {
    const [order, setOrder] = useState<Order>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        getData({ endPoint: `/v1/user/installation/request/${id}` })
            .then((data) => {
                console.log(data?.data);
                setOrder(data?.data);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [id]);
    return loading ? (
        <LoadingSpinner />
    ) : (
        <>
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
                                <p>{order?.name}</p>
                            </div>
                            <div className="flex gap-2">
                                <div
                                    className={`h-4 w-4 flex place-self-center rounded-full ${
                                        order?.status === "فعال"
                                            ? "green"
                                            : order?.status === "پاسخ داده شده"
                                            ? "yellow"
                                            : "green"
                                    }-status shadow-md`}
                                />
                                <strong>وضعیت:</strong>
                                <p>{order?.status}</p>
                            </div>
                            <div className="flex gap-2">
                                <Building className="text-orange-400" />
                                <strong>نوع ساختمان:</strong>
                                <p>{order?.buildingType}</p>
                            </div>
                            <div className="flex gap-2">
                                <Gauge className="text-orange-400" />
                                <strong>درخواست توان:</strong>
                                <p>{order?.powerRequest}</p>
                            </div>
                            <div className="flex gap-2">
                                <CircleDollarSign className="text-orange-400" />
                                <strong>حداکثر هزینه:</strong>
                                <p>{order?.maxCost}</p>
                            </div>
                            <div className="flex gap-2">
                                <CalendarDays className="text-orange-400" />
                                <strong>تاریخ ایجاد:</strong>
                                <p>
                                    {new Date(
                                        String(order?.createdTime)
                                    ).toLocaleString()}
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
                            <p>{order?.address.province}</p>
                        </div>
                        <div className="flex gap-2">
                            <Building2 className="text-orange-400" />
                            <strong>شهر:</strong>
                            <p>{order?.address.city}</p>
                        </div>
                        <div className="flex gap-2">
                            <Route className="text-orange-400" />
                            <strong>خیابان:</strong>
                            <p>{order?.address.streetAddress}</p>
                        </div>
                        <div className="flex gap-2">
                            <Mail className="text-orange-400" />
                            <strong>کد پستی:</strong>
                            <p>{order?.address.postalCode}</p>
                        </div>
                        <div className="flex gap-2">
                            <Home className="text-orange-400" />
                            <strong>پلاک:</strong>
                            <p>{order?.address.houseNumber}</p>
                        </div>
                        <div className="flex gap-2">
                            <DoorOpen className="text-orange-400" />
                            <strong>واحد:</strong>
                            <p>{order?.address.unit}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
