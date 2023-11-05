import { type Menu, menus } from '@services/data'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

interface OrderOptions {
    name: string
    value: string
}

interface Order {
    id: string
    total: number
    options: OrderOptions[]
    detail?: string
}

const orderAtom = atomWithStorage<Order[]>('orders', [])

export const useOrder = () => useAtom(orderAtom)

export const calculatePrice = ({
    order,
    menu
}: {
    order: Order
    menu: Menu | undefined
}) => {
    if (!menu) return 0

    return (
        (menu.price +
            menu.options.reduce(
                (total, { title, options }) =>
                    total +
                    (options.find((option) =>
                        order.options.find(
                            (orderOption) =>
                                orderOption.name === title &&
                                orderOption.value === option.name
                        )
                    )?.price ?? 0),
                0
            )) *
        order.total
    )
}

const priceAtom = atom((get) => {
    const orders = get(orderAtom)

    const priceByOrders = orders
        .map((order) => ({
            menu: menus.find((menu) => menu.id === order.id),
            order
        }))
        .filter(({ menu }) => menu)
        .map(calculatePrice)

    return [
        priceByOrders.reduce((acc, price) => acc + price, 0),
        priceByOrders
    ] as const
})

export const usePrice = () => useAtom(priceAtom)[0]
