'use client'

import React, { useRef, useState, Fragment, useEffect } from 'react';

import Link from 'next/link'
import { useOrder, usePrice, orderAtom } from '@stores/order'
import { menus } from '@services/data'
import { useResetAtom } from 'jotai/utils';
import { useParams, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import axios from 'axios';


const { format } = Intl.NumberFormat('th')

interface Menu {
    menu_name: string;
    meat: string;
    spicy: string;
    egg: string;
    container: string;
    optionalText: string;
    orderMenuStatus: string;
}

export default function Status() {
    const { orderId } = useParams();
    const [order, setOrder] = useState<Menu[]>([]);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/getOrderById/${orderId}`);
            setOrder(response.data.orderMenu);
            setStatus(response.data.orderStatus);
            console.log("resData", response.data)
        } catch (error) {
            console.error('Error fetching order:', error);
            return [];
        }
    };
    useEffect(() => {
        fetchOrder()
    }, [])

    console.log("orderId:", orderId)
    console.log("order:", order)
    const [status, setStatus] = useState('pending');

    const [total, prices] = usePrice()
    const router = useRouter()
    const navigate = (path: string) => {
        router.push(path);
    }
    const resetOrders = useResetAtom(orderAtom);
    const [orders, setOrders] = useState(useAtom(orderAtom)[0]);
    const handleResetOrders = () => {
        resetOrders();
        setOrders([]);
        console.log('Orders data has been reset in the browser storage.');
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (order.length === 0) {
                router.push('/home');
            }
        }, 60000);

        // Clean up function to clear the timeout when the component unmounts
        return () => clearTimeout(timeoutId);
    }, [order, router]);


    return (
        <div className="flex flex-col gap-2 px-4 h-full w-full">
            <div className='flex items-center justify-center py-1 bg-[#D9D8DA]'>
                <video className='h-48 w-auto object-contain' src='/status/hourglass.mp4' preload="auto" loop autoPlay muted></video>

            </div>
            <header className="flex-row items-center">
                <h2 className="text-gray-700">สถานะคำสั่งซื้อของออเดอร์ {orderId}:</h2>
                <h1 className="text-gray-700 text-xl">
                    {status === 'pending' && 'รอการยืนยันจากร้านค้า'}
                    {status === 'approved' && 'ร้านค้าได้รับคำสั่งซื้อแล้ว'}
                    {status === 'rejected' && 'ร้านค้ายกเลิกคำสั่งซื้อ'}
                    {status === 'wait-pay' && 'กำลังรอการชำระเงิน'}
                    {status === 'cooking' && 'กำลังเตรียมออเดอร์'}
                    {status === 'finished' && 'ออเดอร์ของคุณเสร็จแล้ว'}
                </h1>
            </header>
            <div className="flex p-4 items-center justify-between">
                <div className="flex w-16 h-16 rounded bg-statusbg items-center justify-center">
                    {status === 'pending' || status === 'wait-pay' || status === 'rejected' ? (
                        <img src="/icons/approve.svg" className="w-8 h-8" />
                    ) : <img src="/icons/approve.svg" className="w-8 h-8" />}
                    {status === 'approved' && <img src="/icons/approve-active.svg" className="w-8 h-8" />}
                    {status === 'cooking' || status === 'finished' ? (
                        <img src="/icons/approve-done.svg" className="w-8 h-8" />
                    ) : ''}
                </div>
                <div className="w-12 h-2 bg-statusbg rounded-full overflow-hidden">
                    {status === 'pending' || status === 'wait-pay' || status === 'rejected' ? (
                        <div className="h-full"></div>
                    ) : <div className="h-full"></div>}
                    {status === 'approved' && <div className="h-full bg-coral animate-left-to-right"></div>}
                    {status === 'cooking' || status === 'finished' ? (
                        <div className="h-full bg-coral"></div>
                    ) : ''}
                </div>
                <div className="flex w-16 h-16 rounded bg-statusbg items-center justify-center">
                    {status === 'pending' || status === 'wait-pay' || status === 'rejected' || status === 'approved' ? (
                        <img src="/icons/cooking.svg" className="w-8 h-8" />
                    ) : <img src="/icons/cooking.svg" className="w-8 h-8" />}
                    {status === 'cooking' && <img src="/icons/cooking-active.svg" className="w-8 h-8" />}
                    {status === 'finished' && <img src="/icons/cooking-done.svg" className="w-8 h-8" />}
                </div>
                <div className="w-12 h-2 bg-statusbg rounded-full overflow-hidden">
                    {status === 'pending' || status === 'wait-pay' || status === 'rejected' || status === 'approved' ? (
                        <div className="h-full"></div>
                    ) : <div className="h-full"></div>}
                    {status === 'cooking' && <div className="h-full bg-coral animate-left-to-right"></div>}
                    {status === 'finished' || status === 'finished' ? (
                        <div className="h-full bg-coral"></div>
                    ) : ''}
                </div>
                <div className="flex w-16 h-16 rounded bg-statusbg items-center justify-center">
                    {status === 'pending' || status === 'wait-pay' || status === 'rejected' || status === 'approved' || status === 'cooking' ? (
                        <img src="/icons/bell.svg" className="w-8 h-8" />
                    ) : <img src="/icons/bell.svg" className="w-8 h-8" />}
                    {status === 'finished' && <img src="/icons/bell-active.svg" className="w-8 h-8" />}
                </div>
            </div>
            <section className="flex flex-col gap-3 my-4">
                <div className="absolute left-0 right-0 w-100vw h-[10px] bg-[#D9D8DA]" /> <br />
                <h1 className='text-xl'>สรุปคำสั่งซื้อ</h1>
                {order.map((menu, index) => {

                    return (
                        <Fragment key={index.toString()}>

                            <article key={menu.menu_name} className="flex gap-2">
                                <p className="flex justify-center items-end w-7 h-7 border-2 border-gray-300 text-gray-600 rounded-lg">
                                    {1}
                                </p>
                                <header className="flex flex-col">
                                    <h3 className="text-gray-700 text-md">
                                        {menu.menu_name}{menu.meat}
                                    </h3>
                                    <p className="text-gray-500 font-light text-sm">
                                        {menu.spicy} {menu.egg} {menu.container}
                                    </p>
                                    <p className="text-gray-500 font-light text-sm">
                                        {menu.optionalText}
                                    </p>
                                </header>
                                <div className='foodstatus ml-auto'>
                                    {menu.orderMenuStatus === 'pending' && ''}
                                    {menu.orderMenuStatus === 'approved' && <img className='mt-1.5' src="/status/correct.svg" alt="" />}
                                    {menu.orderMenuStatus === 'rejected' && <img className='mt-1.5' src="/status/x.svg" alt="" />}
                                    {menu.orderMenuStatus === 'wait-pay' && ''}
                                    {menu.orderMenuStatus === 'cooking' && 'กำลังเตรียมออเดอร์'}
                                    {menu.orderMenuStatus === 'finished' && <img className='mt-1.5' src="/status/correct.svg" alt="" />}
                                </div>
                            </article>
                        </Fragment>
                    )
                })}
            </section>
            <footer className="absolute left-0 bottom-0 bg-white w-full py-4 px-4 mt-4">
                {status == 'pending' &&
                    <>
                        <button
                            className="btn w-full text-white text-md bg-coral py-3 rounded mb-2"
                            disabled={false}
                            onClick={() => router.push(`/payment/${orderId}`)}
                        >
                            ชำระเงิน - ฿ {format(total)}
                        </button><button
                            onClick={() => (document.getElementById('cancelModal') as HTMLDialogElement).showModal()}
                            className="btn w-full text-white text-md bg-coral py-3 rounded"
                        >
                            ยกเลิกคำสั่งซื้อ
                        </button>
                    </>
                }

                {status == 'finished' &&
                    <>
                        <button
                            className="btn w-full text-white text-md bg-coral py-3 rounded mb-2"
                            disabled={false}
                            onClick={() => router.push(`/home`)}
                        >
                            กลับไปหน้าแรก
                        </button>
                    </>
                }
            </footer>

            <dialog id="cancelModal" className="modal">
                <div className="modal-box bg-white flex flex-col py-6 px-4 w-full">
                    <h1 className='text-xl text-center'>คุณต้องการยกเลิกคำสั่งซื้อใช่หรือไม่</h1>
                    <div className="flex justify-between pt-4">
                        <form method="dialog">
                            <button className="btn bg-gray-400 text-white w-40">ยกเลิก</button>
                        </form>
                        <button className="btn bg-coral text-white w-40" onClick={handleResetOrders}>ตกลง</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
