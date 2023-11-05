import type { Metadata } from 'next'

import { Card, ViewOrder } from '@modules'
import { menus } from '@services/data'

export const metadata: Metadata = {
    title: 'Hello',
    openGraph: {
        title: 'Next Starter',
        description: "SaltyAom's Next Starter",
        images: '/og',
        authors: 'SaltyAom'
    }
}

export default function Index() {
    return (
        <>
            <main
                id="catalog"
                className="grid gap-3 items-start w-full h-screen text-2xl p-3"
            >
                {menus.map((props) => (
                    <Card key={props.id} {...props} />
                ))}
            </main>
            <ViewOrder />
        </>
    )
}
