import { Kanit } from 'next/font/google'
import type { PropsWithChildren } from 'react'

import '@styles/global.sass'

import { Navbar } from '@modules'

const kanit = Kanit({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['thai']
})

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <title>Hello World</title>
            <body className={kanit.className}>
                <Navbar />
                {children}
            </body>
        </html>
    )
}
