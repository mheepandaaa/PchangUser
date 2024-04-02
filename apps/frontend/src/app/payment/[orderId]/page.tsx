'use client'

import { saveAs } from 'file-saver';
import QRCode from 'qrcode.react';
import React, { useRef, useState, Fragment, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation'

import Link from 'next/link'
import { useOrder, usePrice } from '@stores/order'
import { menus } from '@services/data'
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import axios from 'axios';
import generatePayload from 'promptpay-qr';

const { format } = Intl.NumberFormat('th')

interface Menu {
    menu_name: string;
    meat: string;
    spicy: string;
    egg: string;
    container: string;
    optionalText: string;
    orderMenuStatus: string;
    price: number;
  }

export default function payment() {
    const { orderId } = useParams();
    const [order, setOrder] = useState<Menu[]>([]);
    const [total, setTotal] = useState()

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/getOrderById/${orderId}`);
            console.log("resData: ",response.data)
            setOrder(response.data.orderMenu)
            setTotal(response.data.totalPrice)

        } catch (error) {
            console.error('Error fetching order:', error);
            return [];
        }
    };
    useEffect(() => {
        fetchOrder()
    }, [])
    const router = useRouter();
    const navigate = (path: string) => {
        router.push(path);
    }
    console.log("orderId:", orderId)
    console.log("order:", order)
    const [qrCode, setqrCode] = useState("sample");

    const downloadQR = () => {
        const canvas = document.getElementById("QRcanvas") as HTMLCanvasElement | null;
        if (canvas) {
            canvas.toBlob((blob) => {
                saveAs(blob!, "qr-code.png");
            }, "image/png");
        }
    };
    function handleQR() {
        setqrCode(generatePayload("012-345-6789", { amount: total }));
    }
    useEffect(() => {
        handleQR();
    }, [total]);

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
        formData.append('image', file);

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
            const fileUrl = data.imageUrl;
            console.log("data:", data)
            console.log('orderId', orderId)
            console.log('total', total)
            console.log('Uploaded file URL:', fileUrl);

            if (response.ok) {
                console.log('Uploaded file URL:', fileUrl);
                fetch("http://localhost:3001/addPayment", {
                        method: "POST",
                        body: JSON.stringify({
                            order_id: orderId,
                            payment_picture: fileUrl,
                            total_price: [total]
                        })
                    })
                router.replace(`/status/${orderId}`)
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


    return (
        <div className="flex flex-col gap-2 p-4">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl text-gray-700">สรุปยอด</h1>
            </header>
            <section className="flex flex-col gap-3 my-4">
                {order.length > 0 && order.map(( menu, index ) => {
                    console.log("menu:",menu)
                    return (
                        <Fragment key={index}>
                            <div className="w-full h-[1px] bg-gray-200" />

                            <article key={menu?.menu_name} className="flex gap-2">
                                <p className="flex justify-center items-end w-7 h-7 border-2 border-gray-300 text-gray-600 rounded-lg">
                                    {1}
                                </p>
                                <header className="flex flex-col">
                                    <h3 className="text-gray-700 text-md">
                                        {menu.menu_name}{menu.meat}
                                    </h3>
                                    <p className="text-gray-500 font-light text-sm">
                                        {menu?.spicy} {menu.egg} {menu?.container}
                                    </p>
                                    <p className="text-gray-500 font-light text-sm">
                                        {menu.optionalText}
                                    </p>
                                </header>
                                <p className="flex flex-1 justify-end font-light text-gray-700">
                                    ฿ {menu.price}
                                </p>
                            </article>
                        </Fragment>
                    )
                })}
                <hr />
                <aside className="flex justify-between items-center text-coral">
                    <h2>รวมทั้งหมด</h2>
                    <p>฿ {total}</p>
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
                    <img src='/icons/chat-bubble.svg' className='txtbubble h-32 w-56 rotate-180' alt="Chat bubble" />
                    <h1 className='absolute top-1/2 text-white font-bold'>ดาวน์โหลด Qr code</h1>
                </div>
                <div className="absolute left-0 right-0 w-100vw h-[10px] bg-[#D9D8DA]" /> <br />
            </div>
            <footer className="bottom left-0 bottom-0 w-full bg-white">
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
        </div>
    )
}
