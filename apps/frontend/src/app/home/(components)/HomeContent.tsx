'use client'
import { Card, Navbar, ViewOrder } from "@components/modules";
import { Menu } from "@services/data"
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useOrderIds } from "@app/order/page";
interface PageProps {
    menus: Menu[];
}

export default function HomeContent({ menus }: PageProps) {
    const router = useRouter()
    const orderIdList = useOrderIds()
    console.log("orderId", orderIdList)
    const [searchQuery, setSearchQuery] = useState('')
    const filteredMenus = menus.filter((menu) =>
        menu.title.indexOf(searchQuery) !== -1
    )
    const handleOrderStatusClick = (orderId: string | number) => {
        router.replace(`/status/${orderId}`);
    };
    return (
        <>
            <Navbar setSearchQuery={setSearchQuery} />
            <div className="left-0 right-0 w-100vw h-[10px] bg-[#D9D8DA]" />
            {orderIdList.orderIds.length > 0 &&
                <div className=" bg-white w-full py-4 px-4 grid grid-cols-1 gap-2">
                    {orderIdList.orderIds.map((orderId) => (
                        <button
                            className="btn w-full text-white text-md bg-coral"
                            disabled={false}
                            onClick={() => handleOrderStatusClick(orderId)}
                        >
                            ดูสถานะของออเดอร์ {orderId}
                        </button>
                    ))}
                </div>
            }
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
