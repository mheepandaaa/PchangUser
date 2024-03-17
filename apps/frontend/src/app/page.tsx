import { Card, ViewOrder } from '@modules'
import { menus } from '@services/data'

interface PageProps {
    searchQuery: string
}

export default function Page({ searchQuery }: PageProps) {
    const filteredMenus = menus.filter((menu) =>
        menu.title.includes(searchQuery)
    )

    return (
        <>
            <main id="catalog" className="grid gap-3 items-start w-full text-md p-3">
                {filteredMenus.map((props) => (
                    <Card key={props.id} {...props} />
                ))}
            </main>
            <ViewOrder />
        </>
    )
}

export const runtime = 'edge'