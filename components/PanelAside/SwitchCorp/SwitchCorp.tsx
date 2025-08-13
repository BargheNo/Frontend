"use client";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getData } from "@/src/services/apiHub";
import { setCorpId } from "@/src/store/slices/userSlice";
import LoadingSpinner from "@/components/Loading/LoadingSpinner/LoadingSpinner";
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
    const [loading, setLoading] = useState(true);
    // const [corp, setCorp] = useState<string>("0");
    const [corps, setCorps] = useState<Corp[]>([]);
    // const changeCorp = useCallback(
    //     (corpId: string) => {
    //         setCorp(String(corpId));
    //         dispatch(setCorpId(Number(corpId)));
    //     },
    //     [dispatch]
    // );
    const corpID = useSelector((state: RootState) => state.user.corpId);
    useEffect(() => {
        setLoading(true);
        getData({ endPoint: `/v1/user/corps` })
            .then((res) => {
                // console.log(res?.data);
                setCorps(res?.data);
                if (res?.data.length > 0) {
                    dispatch(setCorpId(res?.data?.[0]?.id));
                }
                // changeCorp(res?.data?.[0]?.id);
                // setCorp(String(res?.data?.[0]?.id));
                // console.log("rescorp", res?.data[0]?.id);
                // const corpId = res?.data[0]?.id;
                // dispatch(setCorpId(res?.data[0]?.id));
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [dispatch]);

    return loading ? (
        <Skeleton className="w-full mb-3 h-9" />
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
            <SelectContent dir="rtl">
                {corps &&
                    corps?.map((c, index: number) => (
                        <SelectItem
                            key={index}
                            value={String(c?.id)}
                            className="cursor-pointer"
                        >
                            {c?.name}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
};
