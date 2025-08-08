"use client";
import PanelAside from "@/components/Panel/PanelAside/PanelAside";
import "@/styles/global.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { CorpNavItems } from "@/src/constants/navItems";
import { getData } from "@/src/services/apiHub";
import { setCorpId } from "@/src/store/slices/userSlice";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const dispatch = useDispatch();
    useEffect(() => {
        getData({ endPoint: `/v1/user/corps` }).then((res) => {
            console.log("rescorp", res);
            const corpId = res?.data?.data[0]?.id;
            console.log("corpId", corpId, res);
            dispatch(setCorpId(corpId));
        });
    }, []);

    return (
        <PanelAside navItems={CorpNavItems} mode="corp">
            {children}
        </PanelAside>
    );
}
