'use client'

import { Kanit } from 'next/font/google'
import { useState } from 'react'
import '@styles/global.sass'
import { Navbar } from '@modules'
import Page from './page' // Import the Page component

const kanit = Kanit({ weight: ['300', '400', '500', '600', '700'], subsets: ['thai'] })

export default function RootLayout() {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <html lang="en">
            <title>IT Cafeteria</title>
            <body className={kanit.className}>
                <Navbar setSearchQuery={setSearchQuery} />
                <Page searchQuery={searchQuery} /> {/* Pass searchQuery as a prop */}
            </body>
        </html>
    )
}