'use client'

import { Fragment } from 'react'

import Link from 'next/link'
import { useOrder, usePrice } from '@stores/order'
import { menus } from '@services/data'

const { format } = Intl.NumberFormat('th')

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
            <hr />
            <aside className="flex justify-between items-center text-red-500">
                <h2>รวมทั้งหมด</h2>
                <p>฿ {format(total)}</p>
            </aside>
            <footer className="bottom fixed left-0 bottom-0 w-full p-4">
                <button
                    className="w-full text-white text-xl bg-red-500 py-3 rounded"
                    type="submit"
                >
                    ชำระเงิน - ฿ {format(total)}
                </button>
            </footer>
        </main>
    )
}
