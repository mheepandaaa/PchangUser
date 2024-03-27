'use client'
import { Card, Navbar, ViewOrder } from "@components/modules";
import { Menu } from "@services/data"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
interface PageProps {
    menus: Menu[];
  }

export default function HomeContent({ menus }: PageProps) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')

    const filteredMenus = menus.filter((menu) =>
    menu.title.indexOf(searchQuery) !== -1
  )
    // console.log('Filtered Menus:', filteredMenus)
    return (
        <>
        <Navbar setSearchQuery={setSearchQuery}/>
        <div className="left-0 right-0 w-100vw h-[10px] bg-[#D9D8DA]" />
        <div className=" bg-white w-full py-4 px-4 grid grid-cols-1 gap-2">
                    <button
                        className="btn w-full text-white text-md bg-coral"
                        disabled={false}
                        onClick={() => router.push('/status')}
                    >
                        ดูสถานะของออเดอร์ {"001"}
                    </button>
                    <button
                        className="btn w-full text-white text-md bg-coral"
                        disabled={false}
                        onClick={() => router.push('/status')}
                    >
                        ดูสถานะของออเดอร์ {"002"}
                    </button>
            </div>
                    <div className="absolute left-0 right-0 w-100vw h-[10px] bg-[#D9D8DA]" /> <br />
            <main id="catalog" className="grid gap-3 items-start w-full text-md p-3">
                {filteredMenus.length > 0 ? (
                    filteredMenus.map((props) => (
                        <Link key={props.id} href={`/menu/${props.id}`}>
                            <Card {...props} />
                        </Link>
                    ))
                ) : (
                    <div>No menu items found</div>
                )}
            </main>
            <ViewOrder />
        </>
    )
}
