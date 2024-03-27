'use client'

import axios from 'axios'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface NavbarProps {
    setSearchQuery?: (query: string) => void
}

export default function Navbar({ setSearchQuery }: NavbarProps) {
    const [queueData, setQueueData] = useState([]);
    const path = usePathname()

    const fetchQueueData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/getQueue/');
            const data = response.data;
            setQueueData(data);
        } catch (error) {
            console.error('Error fetching queue data:', error);
        }
    };

    useEffect(() => {
        fetchQueueData();
        const interval = setInterval(fetchQueueData, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery?.(e.target.value)
    }
    return (
        <nav className="sticky z-50 top-0 flex flex-col bg-white border-b shadow shadow-gray-200/50 px-3">
            <header className="flex justify-between items-center w-full h-14">
                <Link href="/home">
                    <h1 className="text-2xl font-medium">
                        พี่ช้าง อาหารตามสั่ง
                    </h1>
                </Link>
                <button onClick={() => (document.getElementById('queueModal') as HTMLDialogElement).showModal()} className="inline btn btn-sm bg-coral border-none text-white"><span className='text-xl items-end'>{3}</span> คิว</button>
            </header>
            {path === '/home' && (
                <aside className="w-full mb-2">
                    <form className="flex justify-center items-center gap-1.5 bg-gray-100 px-2 py-1.5 rounded-md">
                        <img src="/icons/search.svg" alt="Search icon" className="w-5 h-5" />
                        <input
                            className="text-md w-full font-thin outline-none bg-transparent text-gray-700"
                            type="search"
                            placeholder="ค้นหา"
                            onChange={handleSearch}
                        />
                    </form>
                </aside>
            )}


            <dialog id="queueModal" className="modal">
                <div className="modal-box bg-white flex flex-col p-0 w-full h-3/4">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle bg-white absolute right-4 top-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </form>
                    <div className="px-4 p-0 flex flex-col">
                        <div className="w-full flex justify-end mt-2"></div>
                        <h2 className=" font-medium mt-8">ออเดอร์ของคิวก่อนหน้า</h2>
                        <p className="text-gray-500">
                            *สามารถเพิ่มเมนูตามได้ตั้งแต่เมนูที่ 3 ขึ้นไป และไม่เกิน 9
                            จานเท่านั้น
                        </p>
                    </div>
                    <div className="overflow-y-auto overflow-x-hidden">
                        <table className="table text-center w-full ">
                            <thead>
                                <tr>
                                    <th>คิว</th>
                                    <th>เมนู</th>
                                    <th>ออเดอร์รวม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {queueData.map((queue, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <th className='font-normal'>{index + 1}</th>
                                            <td className="text-left">
                                                <p>{queue.menu.split(' ')[0]}</p>
                                                <p className="text-gray-600">
                                                    {queue.menu.split(' ').slice(1).join(' ')} {queue.spicy} {queue.optional_text}
                                                </p>
                                                <Link href={`/menu/${queue.menu_id}`} className="text-coral">
                                                    เพิ่มเมนูตาม
                                                </Link>
                                            </td>
                                            <td>
                                                <p
                                                    className={`flex justify-center items-center w-6 h-6 border-2 rounded mx-auto ${queue.quantity > 6
                                                            ? 'border-red-600'
                                                            : queue.quantity > 3
                                                                ? 'border-yellow-300'
                                                                : 'border-green-300'
                                                        }`}
                                                >
                                                    {queue.quantity}
                                                </p>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </dialog>
        </nav>
    )
}
