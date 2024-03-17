import Link from 'next/link'

interface CardProps {
    id: string
    title: string
    image: string
    price: number
}

export default function Card({ id, title, image, price }: CardProps) {
    return (
        <Link
            href={`/menu/${id}`}
            role="article"
            className="flex flex-col border rounded-lg overflow-hidden shadow shadow-gray-200 hover:shadow-lg focus:shadow-lg hover:-translate-y-1 focus:-translate-y-1 transition-all"
        >
            <figure>
                <img className="h-32 w-full object-cover" src={image} alt={title} />
            </figure>
            <section className="flex justify-between items-center px-2 py-2">
            <h3 className="flex-grow-1 text-ellipsis overflow-hidden">{title}</h3>
                <p className="flex-shrink-0 text-sm font-semibold text-white bg-green-600 px-2 py-1 rounded-lg">
                    ฿ {price}
                </p>
            </section>
        </Link>
    )
}
