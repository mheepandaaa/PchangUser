'use client'

import { Navbar } from "@components/modules"
import { usePathname } from "next/navigation"
import type { PropsWithChildren } from 'react'
import { OrderProvider } from "./home/OrderContext/page";

export default function LayoutProvider({ children }: PropsWithChildren) {
    const pathName = usePathname();
    return (
        <OrderProvider>
        <main className="min-h-screen">
            {pathName !== '/home' && <Navbar/>}
            {children}
        </main>
        </OrderProvider>
    )
}