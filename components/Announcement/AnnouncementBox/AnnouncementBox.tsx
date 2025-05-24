"use client";
import { cn } from "@/lib/utils";
import { deleteData } from "@/src/services/apiHub";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect, useState, useReducer } from "react";
import { createContext } from "react";
import { toast } from "sonner";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { any } from "cypress/types/bluebird";

type State = {
  selectedCount: number;
  selectedIds: string[];
};

type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "ADDID"; payload: string }
  | { type: "REMOVEID"; payload: string }
  | { type: "RESETID" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, selectedCount: state.selectedCount + 1 };
    case "DECREMENT":
      return { ...state, selectedCount: Math.max(0, state.selectedCount - 1) };
    case "RESET":
      return { ...state, selectedCount: 0 };
    case "ADDID":
      return { ...state, selectedIds: [...state.selectedIds, action.payload] };
    case "REMOVEID":
      return {
        ...state,
        selectedIds: state.selectedIds.filter((id) => id !== action.payload),
      };
    case "RESETID":
      return { ...state, selectedIds: [] };
    default:
      return state;
  }
};

export const AnnounceContex = createContext<{
  selectMode: boolean;
  setSelectMode: (value: boolean) => void;
  selectedCount: number;
  selectedIds: string[];
  incrementCount: () => void;
  decrementCount: () => void;
  resetCount: () => void;
  addId: (id: string) => void;
  removeId: (id: string) => void;
  resetId: () => void;
}>({
  selectMode: false,
  setSelectMode: () => {},
  selectedCount: 0,
  selectedIds: [],
  incrementCount: () => {},
  decrementCount: () => {},
  resetCount: () => {},
  addId: () => {},
  removeId: () => {},
  resetId: () => {},
});

export default function AnnouncementBox({
  children,
  className,
  insideClassName,
}: {
  children: React.ReactNode;
  className?: string;
  insideClassName?: string;
}) {
  const holder = useRef<HTMLDivElement>(null);
  // const scrollTween = useRef<gsap.core.Tween | null>(null);
  const [selectMode, setSelectMode] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    selectedCount: 0,
    selectedIds: [],
  });
  // const [currentPos, setCurrentPos] = useState(0);
  // const [scrollable, setScrollable] = useState(true);

  const incrementCount = () => dispatch({ type: "INCREMENT" });
  const decrementCount = () => dispatch({ type: "DECREMENT" });
  const resetCount = () => dispatch({ type: "RESET" });
  const addId = (id: string) => dispatch({ type: "ADDID", payload: id });
  const removeId = (id: string) => dispatch({ type: "REMOVEID", payload: id });
  const resetId = () => dispatch({ type: "RESETID" });

  useEffect(() => {
    if (state.selectedCount === 0) {
      setSelectMode(false);
    }
  }, [state.selectedCount]);

  const queryClient = useQueryClient();
  const handleDelete = useMutation({
    mutationFn: () =>
      deleteData({
        endPoint: "/v1/admin/news",
        data: { newsIDs: state.selectedIds },
      }),
    onSuccess: (responce) => {
      console.log("Mutation successful, response:", responce);
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast.success("خبر با موفقیت حذف شد.");
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("خطایی رخ داده است");
    },
  });

  return (
    <AnnounceContex.Provider
      value={{
        selectMode,
        setSelectMode,
        selectedCount: state.selectedCount,
        selectedIds: state.selectedIds,
        incrementCount,
        decrementCount,
        resetCount,
        addId,
        removeId,
        resetId,
      }}
    >
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "self-end px-1 pt-1 flex neo-card rounded-t-lg bg-[#F0EDEF] transition-all duration-500 ease-in-out transform translate-y-full z-0",
            selectMode && "translate-y-0"
          )}
        >
          <div
            onClick={(e) => {
              e.preventDefault();
              handleDelete.mutate();
            }}
            className="neo-card-rev mx-2 mt-2 p-3 rounded-md bg-white cursor-pointer hover:bg-gray-50"
          >
            حذف
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              resetCount();
              setSelectMode(false);
            }}
            className="neo-card-rev mx-2 mt-2 p-3 rounded-md bg-white cursor-pointer hover:bg-gray-50"
          >
            صرف نظر
          </div>
        </div>
        <div
          className={cn(
            "p-5 rounded-lg z-10",
            selectMode && "rounded-tl-none",
            className
          )}
        >
          <div
            ref={holder}
            className={cn(
              "neo-card-rev rounded-lg p-10 h-full overflow-y-scroll scroll-smooth no-scrollbar flex flex-col justify-start items-center",
              insideClassName
            )}
          >
            {children}
            {/* <div className="w-full h-6" /> */}
          </div>
        </div>
      </div>
    </AnnounceContex.Provider>
  );
}
