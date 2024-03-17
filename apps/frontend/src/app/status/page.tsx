'use client'

import React, { useRef, useState, Fragment } from 'react';

import Link from 'next/link'
import { useOrder, usePrice } from '@stores/order'
import { menus } from '@services/data'

const { format } = Intl.NumberFormat('th')

export default function Order() {
    const [orders] = useOrder()
    const [total, prices] = usePrice()

    return (
        <main className="flex flex-col gap-2 px-4 pb-24">
            <div className='flex items-center justify-center bg-[#D9D8DA]'>
                <video className='h-48 w-auto object-contain' src='/status/hourglass.mp4' preload="auto" loop autoPlay muted></video>

            </div>
            <header className="flex-row items-center">
                <h2 className="text-gray-700">สถานะคำสั่งซื้อของออเดอร์ 001:</h2>
                <h1 className="text-xl text-gray-700">รอการยืนยันจากร้านค้า</h1>
            </header>
            <div className='flex p-4 items-center justify-between'>
                <div className='flex w-16 h-16 rounded bg-statusbg items-center justify-center'>
                    <img src='/icons/approve.svg' className='w-8 h-8'></img>
                </div>
                <div className="w-12 h-2 bg-statusbg rounded-full overflow-hidden">
                    {/* <div className="h-full bg-coral animate-left-to-right"></div> */}
                </div>
                <div className='flex w-16 h-16 rounded bg-statusbg items-center justify-center'>
                    <img src='/icons/cooking.svg' className='w-8 h-8'></img>
                </div>
                <div className="w-12 h-2 bg-statusbg rounded-full overflow-hidden">
                    {/* <div className="h-full bg-coral animate-left-to-right"></div> */}
                </div>
                <div className='flex w-16 h-16 rounded bg-statusbg items-center justify-center'>
                    <img src='/icons/bell.svg' className='w-8 h-8'></img>
                </div>
            </div>
            <h1>คิวก่อนหน้า : 2</h1>
            <section className="flex flex-col gap-3 my-4">
                <div className="absolute left-0 right-0 w-100vw h-[10px] bg-[#D9D8DA]" /> <br />
                <h1 className='text-xl'>สรุปคำสั่งซื้อ</h1>
                {orders.map(({ id, total, options, detail }, index) => {
                    const menu = menus.find((m) => m.id === id)

                    if (!menu) return null

                    const { title } = menu

                    return (
                        <Fragment key={id + index.toString()}>

                            <article key={title} className="flex gap-2">
                                <p className="flex justify-center items-end w-7 h-7 border-2 border-gray-300 text-gray-600 rounded-lg">
                                    {total}
                                </p>
                                <header className="flex flex-col">
                                    <h3 className="text-gray-700 text-md">
                                        {title}
                                    </h3>
                                    <p className="text-gray-500 font-light text-sm">
                                        {options
                                            .map(({ value }) => value)
                                            .join(', ')}
                                    </p>
                                    <p className="text-gray-500 font-light text-sm">
                                        {detail}
                                    </p>
                                </header>
                                <div className='foodstatus ml-auto'>
                                <img className='mt-1.5' src="/status/correct.svg" alt="" />
                                </div>
                            </article>
                        </Fragment>
                    )
                })}
            </section>
            <footer className="bottom bg-white fixed left-0 bottom-0 w-full p-4">
                <button
                    className="w-full text-white text-md bg-coral py-3 rounded mb-2"
                >
                    ชำระเงิน - ฿ {format(total)}
                </button>
                <input

                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                />
                <button

                    className="w-full text-white text-md bg-coral py-3 rounded"
                >
                    ยกเลิกคำสั่งซื้อ
                </button>
                <input

                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                />
            </footer>
        </main>
    )
}
