'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
    const path = usePathname()

    return (
        <nav className="sticky top-0 flex flex-col bg-white border-b shadow shadow-gray-200/50 px-3">
            <header className="flex justify-between items-center w-full h-14">
                <Link href="/">
                    <h1 className="text-2xl font-medium">
                        พี่ช้าง อาหารตามสั่ง
                    </h1>
                </Link>
                <section className="flex justify-end items-center gap-3">
                    <time className="text-red-500 text-2xl">
                        {15}
                        <sub>min</sub>
                    </time>
                    <h2 className="text-2xl font-medium rounded bg-red-500 text-white px-2 py-1">
                        {3} คิว
                    </h2>
                </section>
            </header>
            {path === '/' && (
                <aside className="w-full mb-2">
                    <form className="flex justify-center items-center gap-1.5 bg-gray-100 px-2 py-1.5 rounded">
                        <img
                            src="/icons/search.svg"
                            alt="Search icon"
                            className="w-5 h-5"
                        />
                        <input
                            className="text-xl w-full font-thin outline-none bg-transparent text-gray-700"
                            type="search"
                            placeholder="ค้นหา"
                        />
                    </form>
                </aside>
            )}
        </nav>
    )
}
