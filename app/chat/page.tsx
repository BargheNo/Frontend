"use client";
import ChatBox from "@/components/Chat/ChatBox/ChatBox";
import ChatList from "@/components/Chat/ChatList/ChatList";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import useClientCheck from "@/src/hooks/useClientCheck";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/src/hooks/useMediaQuery";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarContent } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
export default function Page() {
  const [panelWidth, setPanelWidth] = useState(0.1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    console.log(panelWidth);
  }, [panelWidth]);

  const isClient = useClientCheck();
  if (!isClient)
    return <div className="h-full w-full bg-gray-100 p-4">Loading...</div>;

  if (isMobile) {
    return (
      <>
        <SidebarProvider>
          <Sidebar side="right">
            <SidebarContent className="neo-card! bg-[#F0EDEF]! rtl">
              <ChatList className="w-full h-full" conditionWidth={100} />
            </SidebarContent>
          </Sidebar>

          <div className="fixed bottom-[95px] left-3 right-3 top-3">
            <SidebarTrigger
              className="fixed top-8 left-20 z-50 p-2 bg-gray-100 rounded-lg text-black"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu />
            </SidebarTrigger>
            <ChatBox className="w-full h-full rtl" />
          </div>
        </SidebarProvider>
      </>
    );
  }

  return (
    <ResizablePanelGroup className="min-h-full" direction="horizontal">
      <ResizablePanel
        className="h-full flex justify-center items-center py-2 pl-1 pr-2 rounded-lg bg-transparent"
        defaultSize={15}
        minSize={15}
        maxSize={50}
        style={{ flexGrow: panelWidth, flexShrink: 1, flexBasis: "0%" }}
        onResize={(size) => {
          if (size < 30) {
            setPanelWidth(15);
            return;
          }
          setPanelWidth(size);
        }}
      >
        <ChatList conditionWidth={panelWidth} className="w-full h-full" />
      </ResizablePanel>
      <ResizableHandle className="bg-transparent" />
      <ResizablePanel className="h-full flex justify-center items-center py-2 pl-3 pr-2 bg-transparent rounded-lg">
        <ChatBox className="w-full h-full" />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
