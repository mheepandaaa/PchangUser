

import { Kanit } from 'next/font/google'
import type { PropsWithChildren } from 'react'
import '@styles/global.sass'
import { Navbar } from '@modules'
import React from 'react'
import LayoutProvider from './layoutProvider'

const kanit = Kanit({ weight: ['300', '400', '500', '600', '700'], subsets: ['thai', 'latin'] })

export default function RootLayout({ children }: PropsWithChildren) {


  return (
    <html lang="en">
      <title>IT Cafeteria</title>
      <body className={kanit.className}>
        <LayoutProvider>
          {children}
        </LayoutProvider>
      </body>
    </html>
  )
}