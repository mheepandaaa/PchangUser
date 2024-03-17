'use client'

import Link from 'next/link'

import { usePrice } from '@stores/order'

const { format } = Intl.NumberFormat('th')

export default function ViewOrder() {
    const [price] = usePrice()

    if (price <= 0) return null

    return (
        <footer className="bottom sticky left-0 bottom-0 w-full p-4 bg-white border-t-2 border-gray-300">
            <Link
                href="/order"
                className="flex justify-center items-center w-full text-white text-xl bg-red-500 py-3 rounded"
            >
                ชำระเงิน - {format(price)} ฿
            </Link>
        </footer>
    )
}
