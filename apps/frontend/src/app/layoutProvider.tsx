'use client'

import { Navbar } from "@components/modules"
import { usePathname } from "next/navigation"
import type { PropsWithChildren } from 'react'
export default function LayoutProvider({ children }: PropsWithChildren) {
    const pathName = usePathname();
    return (
        <div className="min-h-screen">
            {pathName !== '/home' && <Navbar/>}
            {children}
        </div>
    )
}