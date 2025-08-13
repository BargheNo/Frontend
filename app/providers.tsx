// app/providers.tsx
"use client"; // Mark this component as a Client Component

import { Provider } from "react-redux";
import { store } from "@/src/store/store"; // Corrected path based on your `src/store/store.ts`
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { WebSocketProvider } from "@/components/WebSocketProvider/WebSocketProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    // queries: {
                    //   staleTime: 60 * 1000, // 1 minute
                    //   retry: 1,
                    // },
                },
            })
    );
    // const pathname = usePathname();
    // if (pathname?.startsWith("/announcements")) {
    // 	return (
    // 		<QueryClientProvider client={queryClient}>
    // 			<Provider store={store}>
    // 				<WebSocketProvider>{children}</WebSocketProvider>
    // 			</Provider>
    // 		</QueryClientProvider>
    // 	);
    // }
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <WebSocketProvider>
                    <SidebarProvider>{children}</SidebarProvider>
                </WebSocketProvider>
            </Provider>
        </QueryClientProvider>
    );
}
