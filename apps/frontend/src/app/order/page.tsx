'use client'

// import { saveAs } from 'file-saver';
// import QRCode from 'qrcode.react';
import React, { useState, Fragment } from 'react';

import Link from 'next/link'
import { useOrder, usePrice } from '@stores/order'
import { menus } from '@services/data'

const { format } = Intl.NumberFormat('th')
const [ amount, setAmount ] = useState(1.00);         
const [ qrCode ,setqrCode ] = useState("sample");

// function handlePhoneNumber(e) {
//     setPhoneNumber(e.target.value);
//   }
//   function handleAmount(e) {
//     setAmount(parseFloat(e.target.value));
//   }

//   const downloadQR = () => {
//     var canvas = document.getElementById("QRcanvas");
//     canvas.toBlob(function(blob) {
//       saveAs(blob, "qr-code.png");
// });
//   }
//   function handleQR() {
//     setqrCode(generatePayload("012-345-6789", { amount }));
//   }

// function showQr() {
//     const [showCode, setShowCode] = useState(false);
  
//     const showQrBtn = () => {
//       setShowCode(true);
//     }; 
// }

export default function Order() {
    const [orders] = useOrder()
    const [total, prices] = usePrice()

    return (
        <main className="flex flex-col gap-2 p-4 pb-24">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl text-gray-700">สรุปยอด</h1>
                <Link href="/">เพิ่มออเดอร์ &gt;</Link>
            </header>
            <section className="flex flex-col gap-3 my-4">
                {orders.map(({ id, total, options, detail }, index) => {
                    const menu = menus.find((m) => m.id === id)

                    if (!menu) return null

                    const { title } = menu

                    return (
                        <Fragment key={id + index.toString()}>
                            <div className="w-full h-[1px] bg-gray-200" />

                            <article key={title} className="flex gap-2">
                                <p className="flex justify-center items-end w-7 h-7 border-2 border-gray-300 text-gray-600 rounded-lg">
                                    {total}
                                </p>
                                <header className="flex flex-col">
                                    <h3 className="text-gray-700 text-xl">
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
                                        className="text-red-500 text-sm mt-2"
                                        href={`/edit/${index}`}
                                    >
                                        แก้ไข
                                    </Link>
                                </header>
                                <p className="flex flex-1 justify-end font-light text-gray-500">
                                    ฿ {format(prices[index])}
                                </p>
                            </article>
                        </Fragment>
                    )
                })}
            </section>
            {/* <>
      {showQr && (
        <div className='w-full items-center flex justify-center mt-8'>
          <div className='qrImg h-56 w-56 items-center flex justify-center'>
            <QRCode id='QRcanvas' value={qrCode} size={180}/>
          </div>
        </div>
      )}

      <div className='w-full flex items-center justify-center relative'>
        <img src='/chat-bubble.svg' className='txtbubble h-40 w-64 rotate-180' alt="Chat bubble"></img>
        <h1 className='absolute top-1/2 text-white font-bold' onClick={downloadQR}>ดาวน์โหลด Qr code</h1>
      </div>
    </> */}
            <hr />
            <aside className="flex justify-between items-center text-red-500">
                <h2>รวมทั้งหมด</h2>
                <p>฿ {format(total)}</p>
            </aside>
            <footer className="bottom fixed left-0 bottom-0 w-full p-4">
                <button
                    // onClick={showQr}
                    className="w-full text-white text-xl bg-red-500 py-3 rounded"
                    type="submit"
                >
                    ชำระเงิน - ฿ {format(total)}
                </button>
            </footer>
        </main>
    )
}
