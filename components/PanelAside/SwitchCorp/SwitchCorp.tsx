"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getData } from "@/src/services/apiHub";
import { setCorpId, setCorps } from "@/src/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { RootState } from "@/src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
interface Corp {
    id: number;
    name: string;
}
export const SwitchCorp = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    // const [corp, setCorp] = useState<string>("0");
    // const [corpsList, setCorpsList] = useState<Corp[]>([]);
    // const changeCorp = useCallback(
    //     (corpId: string) => {
    //         setCorp(String(corpId));
    //         dispatch(setCorpId(Number(corpId)));
    //     },
    //     [dispatch]
    // );
    const corps = useSelector((state: RootState) => state.user.corps);
    const corpID = useSelector((state: RootState) => state.user.corpId);
    // useEffect(() => {
    //     console.log(corps);
    // }, []);
    // useEffect(() => {
    //     setLoading(true);
    //     getData({ endPoint: `/v1/user/corps` })
    //         .then((res) => {
    //             console.log("setting 2");
    //             dispatch(setCorps(res?.data));
    //             setLoading(false);
    //             if (!corpID) {
    //                 dispatch(setCorpId(res?.data?.[0]?.id));
    //             }
    //         })
    //         .catch((err) => console.log(err))
    //         .finally(() => setLoading(false));
    // }, [corpID]);

    return loading ? (
        <Skeleton className="w-full mb-3 h-9 bg-gray-200" />
    ) : (
        <Select
            value={String(corpID)}
            onValueChange={(value) => {
                dispatch(setCorpId(Number(value)));
            }}
        >
            <SelectTrigger
                dir="rtl"
                className="text-black w-full shadow-inner shadow-[rgba(0,0,0,0.2)] mb-3 text-right bg-white"
            >
                <SelectValue placeholder="انتخاب شرکت" />
            </SelectTrigger>
            <SelectContent dir="rtl" className="rtl">
                {corps &&
                    corps?.map((c, index: number) => (
                        <SelectItem
                            key={index}
                            value={String(c?.id)}
                            className="rtl"
                            dir="rtl"
                            // className="cursor-pointer"
                        >
                            <div className="flex flex-row cursor-pointer gap-2">
                                <div
                                    className={`${
                                        c.status === "تایید شده"
                                            ? "green-status"
                                            : c.status === "رد شده"
                                            ? "red-status"
                                            : c.status === "معلق"
                                            ? "gray-status"
                                            : "yellow-status"
                                    } h-4 w-4 rounded-full shadow-md`}
                                />
                                <p className="rtl">{c?.name}</p>
                            </div>
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
};
