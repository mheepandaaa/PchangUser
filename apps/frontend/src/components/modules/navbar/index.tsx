'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavbarProps {
    setSearchQuery: (query: string) => void
  }
  
  export default function Navbar({ setSearchQuery }: NavbarProps) {
    const path = usePathname()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
      }
    return (
        <nav className="sticky top-0 flex flex-col bg-white border-b shadow shadow-gray-200/50 px-3">
            <header className="flex justify-between items-center w-full h-14">
                <Link href="/">
                    <h1 className="text-2xl font-medium">
                        พี่ช้าง อาหารตามสั่ง
                    </h1>
                </Link>
                <button className="inline btn btn-sm bg-coral border-none text-white"><span className='text-xl items-end'>{3}</span> คิว</button>
            </header>
            {path === '/' && (
                <aside className="w-full mb-2">
                    <form className="flex justify-center items-center gap-1.5 bg-gray-100 px-2 py-1.5 rounded-md">
                        <img src="/icons/search.svg" alt="Search icon" className="w-5 h-5" />
                        <input
                            className="text-md w-full font-thin outline-none bg-transparent text-gray-700"
                            type="search"
                            placeholder="ค้นหา"
                            onChange={handleSearch}
                        />
                    </form>
                </aside>
            )}
        </nav>


    )
}
