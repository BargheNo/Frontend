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

  // useEffect(() => {
  //     gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  //     const panels = gsap.utils.toArray('.panel');

  //     panels.forEach((panel, i) => {
  //         ScrollTrigger.create({
  //             scroller: holder.current,
  //             trigger: panel as Element,
  //             start: 'top top',
  //             end: 'bottom top',
  //             scrub: true,
  //             // pin: true,
  //             // snap: 1,
  //             onEnter: (self) =>
  //             {
  //                 console.log("Enter:", i)
  //                 self.isActive && !scrollTween.current && goToSection_down(i)
  //             },
  //             onEnterBack: (self) =>
  //             {
  //                 console.log("Enter Back:", i)
  //                 self.isActive && !scrollTween.current && goToSection_up(i)
  //             },
  //             // onLeave: (self) =>
  //             // {
  //             //     console.log("Leave:", i)
  //             //     // self.isActive && !scrollTween.current && goToSection(i)
  //             // },
  //             // onLeaveBack: (self) =>
  //             // {
  //             //     console.log("Leave Back:", i)
  //             //     // self.isActive && !scrollTween.current && goToSection(i)
  //             // },
  //             // onToggle: (self) =>
  //             // {
  //             //     console.log("Toggle:", i)
  //             // },
  //             id: 'panel-' + i,
  //             // markers: true,
  //         });
  //     });

  //     ScrollTrigger.create({
  //         start: 0,
  //         end: 'max',
  //         snap: 1 / (panels.length - 1),
  //         // markers: true,
  //     });

  //     return () => {
  //         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  //     };
  // }, []);

  // useEffect(() => {
  //     setScrollable(true)
  // }, [currentPos])

  // useEffect(()=>
  // {
  //     const element = holder.current;
  //     if (!element) return;
  //     console.log(currentPos)

  //     const handleScroll = () => {
  //         setScrollable(false)
  //         console.log("Element scrolled:", element.scrollTop);
  //         let target = currentPos??0;
  //         if (element.scrollTop > currentPos)
  //         {
  //             target = currentPos + (element.offsetHeight??0)
  //         }
  //         else
  //         {
  //             target = currentPos - (element.offsetHeight??0)
  //         }
  //         element?.removeEventListener("scroll", handleScroll);
  //         element.scrollTo({ top: target, behavior: "smooth" });
  //         setCurrentPos(target);

  //     };
  //     if(scrollable)
  //     {
  //         element.addEventListener("scroll", handleScroll);
  //     }
  //     return () => {
  //         element?.removeEventListener("scroll", handleScroll);
  //     };
  // }
  // ,[scrollable])

  // const goToSection_down = (i: number) => {
  //     const target = (holder.current?.offsetHeight??0) * (i+1)-1;
  //     console.log("goto: ", target, "currentPos: ", currentPos);
  //     if (target) {
  //         setScrollable(false);
  //         scrollTween.current = gsap.to(holder.current, {
  //             scrollTo: target,
  //             duration: 1.5,
  //             ease: 'power2.inOut',
  //             id: 'scrollTween',
  //             onStart: () => {
  //                 if (holder.current) {
  //                     holder.current.style.overflow = 'hidden';
  //                 }
  //             },
  //             onComplete: () => {
  //                 if (holder.current) {
  //                     holder.current.style.overflow = 'auto';
  //                 }
  //                 scrollTween.current = null;
  //                 setScrollable(true);
  //             },
  //             overwrite: true,
  //         });
  //     }
  // };

  // const goToSection_up = (i: number) => {
  //     const target = (i) * (holder.current?.offsetHeight??0)+1;
  //     console.log("goto: ", target, "currentPos: ", currentPos);
  //     if (target) {
  //         setScrollable(false);
  //         scrollTween.current = gsap.to(holder.current, {
  //             scrollTo: target,
  //             duration: 1.5,
  //             ease: 'power2.inOut',
  //             id: 'scrollTween',
  //             onStart: () => {
  //                 if (holder.current) {
  //                     holder.current.style.overflow = 'hidden';
  //                 }
  //             },
  //             onComplete: () => {
  //                 if (holder.current) {
  //                     holder.current.style.overflow = 'auto';
  //                 }
  //                 scrollTween.current = null;
  //                 setScrollable(true);
  //             },
  //             overwrite: true,
  //         });
  //     }
  // };

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
          {/* <div
            onClick={() => {
              if ((state.selectedCount = 1)) {
              }
            }}
            className="neo-card-rev mx-2 mt-2 p-3 rounded-md bg-white cursor-pointer hover:bg-gray-50"
          >
            ویرایش
          </div> */}
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
