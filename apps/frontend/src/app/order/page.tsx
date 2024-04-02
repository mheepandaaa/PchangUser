'use client'

import { saveAs } from 'file-saver';
import QRCode from 'qrcode.react';
import React, { useRef, useState, Fragment, useEffect } from 'react';
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import { useOrder, usePrice } from '@stores/order'
import { menus } from '@services/data'
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

const { format } = Intl.NumberFormat('th')
const generatePayload = require('promptpay-qr');
let orderId: number;

const orderIdsAtom = atomWithStorage<(string | number)[]>('orderIds', []);
export function useOrderIds() {
    const [orderIds, setOrderIds] = useAtom(orderIdsAtom);
    return { orderIds };
}
export default function Order() {

    const [orderIds, setOrderIds] = useAtom(orderIdsAtom);
    const [qrCode, setqrCode] = useState("sample");
    const [ordersdata, setOrdersData] = useState([]);

    const downloadQR = () => {
        const canvas = document.getElementById("QRcanvas") as HTMLCanvasElement | null;
        if (canvas) {
            canvas.toBlob((blob) => {
                saveAs(blob!, "qr-code.png");
            }, "image/png");
        }
    };

    const router = useRouter()
    const [orders] = useOrder()
    const [total, prices] = usePrice()

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleOrder = async (OrderData: any[]) => {
        const output = OrderData.map(data => {
            const options = data.options.reduce((acc: { [x: string]: any; }, curr: { name: string | number; value: any; }) => {
                acc[curr.name] = curr.value;
                return acc;
            }, {});
            console.log("data",data)
            const menu = {
                menu_id: data.id,
                meat: options['ประเภทเนื้อสัตว์'] || '',
                spicy: options['ระดับความเผ็ด'] || '',
                extra: false,
                egg: options['เพิ่มไข่'] || '',
                optional_text: data.detail || '',
                container: options['ภาชนะ'] || '',
                price: prices
            };
            return Array(data.total).fill(menu);
        }).flat();
        console.log("output",output);
        const body = {
            menu: output
        };

        try {
            const response = await fetch('http://localhost:3001/addOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (response.ok) {
                const data = await response.json();
                orderId = data.order_id;
                setOrderIds((prevOrderIds) => [...prevOrderIds, orderId]);
                console.log('API response:', await response.json());
            } else {
                console.error('API error:', response.statusText);
            }
        } catch (error) {
            console.error('API error:', error);
        }
    }

    const handleConfirmOrder = async () => {
        try {
            await handleOrder(orders);
            console.log("orders",orders)
            router.replace(`/status/${orderId}`);
            console.log('gogogo')
        } catch (e) {
            console.error(e);
            alert("Error processing order. Please check the console for more details.");
        }
    }

    return (
        <div className="flex flex-col gap-2 p-4 h-screen">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl text-gray-700">สรุปยอด</h1>
                <Link className='text-coral' href="/home">เพิ่มออเดอร์ &gt;</Link>
            </header>
            <section className="flex flex-col gap-3 my-4">
                {orders.map(({ id, total, options, detail }, index) => {
                    const menu = menus.find((m) => m.id == id)

                    if (!menu) return null

                    const { title } = menu

                    return (
                        <Fragment key={id + index}>
                            <div className="w-full h-[1px] bg-gray-200" />

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
                                    <Link
                                        className="text-coral text-sm mt-2"
                                        href={`/edit/${index}`}
                                    >
                                        แก้ไข
                                    </Link>
                                </header>
                                <p className="flex flex-1 justify-end font-light text-gray-700">
                                    ฿ {format(prices[index])}
                                </p>
                            </article>
                        </Fragment>
                    )
                })}
                <hr />
                <aside className="flex justify-between items-center text-coral">
                    <h2>รวมทั้งหมด</h2>
                    <p>฿ {format(total)}</p>
                </aside>
            </section>
            <footer className=" sticky bottom left-0 bottom-0 w-full bg-white">
                <button
                    className="btn w-full text-white bg-coral py-3"
                    onClick={handleConfirmOrder}
                >
                    ชำระเงิน - ฿ {format(total)}
                </button>

            </footer>
        </div>
    )
}
