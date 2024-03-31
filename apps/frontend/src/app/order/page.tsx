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
let orderId: string | number;

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            // Create a temporary URL for the selected file
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
        } else {
            setFile(null);
            setPreviewUrl(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) {
            alert('Please select an image to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3001/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                // Check if the response is an HTML document
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('text/html')) {
                    const errorText = await response.text();
                    console.error('Error uploading file:', errorText);
                    alert('An error occurred while uploading the file');
                } else {
                    // Handle other non-JSON responses
                    console.error('Error uploading file:', response.statusText);
                    alert(`Error uploading file: ${response.statusText}`);
                }
                return;
            }

            const data = await response.json();
            const { fileUrl } = data;
            console.log('Uploaded file URL:', fileUrl);

            if (response.ok) {
                const { fileUrl } = data;
                console.log('Uploaded file URL:', fileUrl);
                fetch("http://localhost:3001/addPayment", {
                        method: "POST",
                        body: JSON.stringify({
                            order_id: orderId,
                            payment_picture: fileUrl,
                            total_price: [total]
                        })
                    })
                    // router.replace(`/status/${orderId}`)
            } else {
                console.error('Error uploading file:', data.error);
            }
        } catch (err) {
            console.error('Error uploading file:', err);
        }
    };

    // Clean up the temporary URL when the component unmounts
    React.useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    function handleQR() {
        setqrCode(generatePayload("012-345-6789", { amount: total }));
    }
    useEffect(() => {
        handleQR();
    }, [total]);

    const handleOrder = async (OrderData: any[]) => {
        const output = OrderData.map(data => {
            const options = data.options.reduce((acc: { [x: string]: any; }, curr: { name: string | number; value: any; }) => {
                acc[curr.name] = curr.value;
                return acc;
            }, {});

            const menu = {
                menu_id: data.id,
                meat: options['ประเภทเนื้อสัตว์'] || '',
                spicy: options['ระดับความเผ็ด'] || '',
                extra: false,
                egg: options['เพิ่มไข่'] || '',
                optional_text: data.detail || '',
                container: options['ภาชนะ'] || ''
            };
            return Array(data.total).fill(menu);
        }).flat();
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
            router.replace(`/status/${orderId}`);
            console.log('gogogo')
        } catch (e) {
            console.error(e);
            alert("Error processing order. Please check the console for more details.");
        }
    }

    return (
        <main className="flex flex-col gap-2 p-4">
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
            <div className='payment'>
                <div className='w-full flex flex-col justify-center items-center mt-8'>
                    <img src="/icons/promptpay.svg" alt="PromptPay logo" className="w-24 mb-2" />
                    <div className='qr-code-container h-56 w-56 items-center flex justify-center' style={{ backgroundImage: `url(/icons/cornerBorder.svg)`, backgroundSize: 'cover' }}>
                        <QRCode id='QRcanvas' value={qrCode} size={180} />
                    </div>
                </div>
                <div className='w-full flex items-center justify-center relative' onClick={downloadQR}>
                    <img src='/icons/chat-bubble.svg' className='txtbubble h-32 w-56 rotate-180' alt="Chat bubble"></img>
                    <h1 className='absolute top-1/2 text-white font-bold'>ดาวน์โหลด Qr code</h1>
                </div>
                <div className="absolute left-0 right-0 w-100vw h-[10px] bg-[#D9D8DA]" /> <br />
            </div>
            <footer className="bottom sticky left-0 bottom-0 w-full bg-white pb-4">
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-row items-center gap-2">
                    <div className="w-full">
                        <label htmlFor="file-input" className="flex w-full">
                            <span className="btn text-white text-md bg-coral w-full py-2 px-4">อัปโหลดรูปภาพ</span>
                        </label>
                        <input
                            id="file-input"
                            name='image'
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn bg-coral text-white font-bold w-1/2 py-2 px-4"
                    >
                        ส่งสลิปการชำระ
                    </button>
                </form>
            </footer>
            {previewUrl && (
                <div className="">
                    <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
                </div>
            )}
        </main>
    )
}
