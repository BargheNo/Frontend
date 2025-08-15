import useHasPermission from "@/src/functions/hasPermission";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { NavItem } from "@/src/types/PanelAsideTypes";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";

const SkelethonClassName = "h-10 m-[2px]";

const ToolTipWrapper = ({
    notAllowed,
    children,
}: {
    notAllowed: boolean;
    children: React.ReactNode;
}) => {
    return notAllowed ? (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>شرکت شما در حالت تعلیق است.</TooltipContent>
        </Tooltip>
    ) : (
        <>{children}</>
    );
};

export function PanelAsideIcon({
    item,
    mode,
}: {
    item: NavItem;
    mode: string;
}) {
    const pathname = usePathname();
    // const hasPermission = true;
    const { hasPermission, loading } = useHasPermission(item?.RNPName || "");
    const corps = useSelector((state: RootState) => state.user.corps);
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const isSuspended =
        corps?.find((corp) => corp?.id === corpId)?.isSuspended ?? false;
    const notAllowed =
        mode === "corp" &&
        isSuspended &&
        item.path !== "/corpdashboard/editprofile";

    if (loading) return <Skeleton className={`w-10 ${SkelethonClassName}`} />;
    if (!hasPermission) return <></>;

    return (
        <ToolTipWrapper notAllowed={notAllowed}>
            <Link key={item.path} href={notAllowed ? "" : item.path}>
                <span
                    className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-${
                        notAllowed ? "not-allowed" : "pointer"
                    } ${
                        item.path && pathname?.startsWith(item.path)
                            ? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${
                                  mode === "customer"
                                      ? "from-[#A55FDA] to-[#F37240]"
                                      : mode === "corp"
                                      ? "from-[#2979FF] to-[#1b6cf5]"
                                      : "from-[#FF5B18] to-[#FF6809]"
                              } text-white`
                            : "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
                    }`}
                >
                    {item?.icon}
                </span>
            </Link>
        </ToolTipWrapper>
    );
}

export function PanelAsideTitle({
    item,
    mode,
}: {
    item: NavItem;
    mode: string;
}) {
    const pathname = usePathname();
    // const hasPermission = true;
    const { hasPermission, loading } = useHasPermission(item?.RNPName || "");
    const corps = useSelector((state: RootState) => state.user.corps);
    const corpId = useSelector((state: RootState) => state.user.corpId);
    const isSuspended =
        corps?.find((corp) => corp?.id === corpId)?.isSuspended ?? false;
    const notAllowed =
        mode === "corp" &&
        isSuspended &&
        item.path !== "/corpdashboard/editprofile";

    if (loading) return <Skeleton className={`w-full ${SkelethonClassName}`} />;
    if (!hasPermission) return <></>;

    return (
        <ToolTipWrapper notAllowed={notAllowed}>
            <Link key={item.path} href={notAllowed ? "" : item.path}>
                <span
                    className={`flex gap-2 text-[#003a8b] p-2 mt-0.5 rounded-lg cursor-${
                        notAllowed ? "not-allowed" : "pointer"
                    } ${
                        item.path && pathname?.startsWith(item.path)
                            ? `shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.3)] bg-gradient-to-r ${
                                  mode === "customer"
                                      ? "from-[#A55FDA] to-[#F37240]"
                                      : mode === "corp"
                                      ? "from-[#2979FF] to-[#1b6cf5]"
                                      : "from-[#FF5B18] to-[#FF6809]"
                              } text-white`
                            : "hover:shadow-[inset_-4px_-4px_10px_rgba(255,255,255,0.5),inset_1px_1px_3px_rgba(0,0,0,0.2)] duration-200"
                    }`}
                >
                    {item.name}
                </span>
            </Link>
        </ToolTipWrapper>
    );
}
