'use client'

import { Fragment, useContext, useState } from 'react'

import { useRouter } from 'next/navigation'

import { RadioGroup, RadioGroupItem } from '@shadcn/components/ui/radio-group'
import { Label } from '@shadcn/components/ui/label'

import { menus } from '@services/data'
import { calculatePrice, useOrder } from '@stores/order'
import { OrderContext } from '@app/home/OrderContext/page'

const { format } = Intl.NumberFormat('th')

export default function Page({
    params: { id }
}: {
    params: {
        id: number
    }
}) {
    const router = useRouter()
    const [orders, setOrders] = useOrder()
    const { queueData } = useContext(OrderContext);
    const [total, setTotal] = useState(1)
    const [detail, setDetail] = useState('')
    const [userOptions, setUserOptions] = useState<{
        [orderName: string]: string
    }>({})

    const menu = menus.find((menu) => menu.id == id)

    if (!menu) return null

    const { title, image, options } = menu
    const order = {
        id,
        total,
        detail: detail.length ? detail : undefined,
        options: Object.entries(userOptions).reduce(
            (acc, [name, value]) => [
                ...acc,
                {
                    name,
                    value
                }
            ],
            [] as {
                name: string
                value: string
            }[]
        )
    }

    const price = calculatePrice({
        menu,
        order
    })

    const orderOption = queueData;
    console.log('queueData:', queueData);
    const [ingredient, setIngredient] = useState(orderOption?.menu.split(' ')[1] || '');
    const [spicy, setSpicy] = useState(orderOption?.spicy || '');
    const [egg, setEgg] = useState(orderOption?.egg || '');
    const [container, setContainer] = useState(orderOption?.container || '');
    const [optionalTxt, setOptionalTxt] = useState(orderOption?.optional_text || '');
    const spicyOptions = options.find(option => option.title === 'ระดับความเผ็ด')?.options;
    return (
        <form
            className="flex flex-col"
            onSubmit={(event) => {
                event.preventDefault()

                setOrders([
                    ...orders,
                    {
                        id,
                        total,
                        options: Object.entries(userOptions).reduce(
                            (acc, [name, value]) => [
                                ...acc,
                                {
                                    name,
                                    value
                                }
                            ],
                            [] as {
                                name: string
                                value: string
                            }[]
                        )
                    }
                ])

                router.back()
            }}
        >
            <figure className="w-full">
                <img className="w-full" src={image} alt={title} />
            </figure>
            <header className="flex justify-between items-center px-4 py-2 text-gray-700 border-t border-b-4">
                <h1 className="text-2xl font-medium">{title}</h1>
                <section className="flex flex-col justify-center items-center text-gray-400">
                    <h3 className="flex justify-end items-end gap-2 font-light">
                        ฿{' '}
                        <span className="text-3xl text-gray-700 font-medium">
                            {format(price)}
                        </span>
                    </h3>
                    <p className="font-light text-xs">Base price</p>
                </section>
            </header>
            {options.map(({ title, required, options }) => (
                <section key={title} className="flex flex-col px-4 py-4 border-b-4">
                    <header className="flex items-center gap-2.5">
                        <h2 className="flex gap-2 text-lg text-gray-700">{title}</h2>
                        <p className="text-gray-400 text-sm font-light">
                            {required === 0 ? 'optional' : 'required, select 1'}
                        </p>
                    </header>
                    {title === 'ประเภทเนื้อสัตว์' && (
                        <RadioGroup
                            className="mt-2"
                            required={required > 0}
                            defaultValue={ingredient}
                            onValueChange={(value) => {
                                setUserOptions({
                                    ...userOptions,
                                    [title]: value,
                                });
                            }}
                        >
                            {options.map(({ name, price }, index) => (
                                <Fragment key={name}>
                                    {index !== 0 && (
                                        <div className="w-full h-[1px] bg-gray-200" />
                                    )}
                                    <section className="flex items-center gap-2 py-0.5">
                                        <RadioGroupItem
                                            value={name}
                                            id={`option-${title}-${name}`}
                                        />
                                        <Label
                                            htmlFor={`option-${title}-${name}`}
                                            className="flex justify-between w-full text-base text-gray-700 font-light"
                                        >
                                            {name}
                                            {price !== null && (<p className="flex flex-1 justify-end items-baseline font-light gap-1"> <span className="text-xs text-gray-400 font-light"> ฿ </span> {price} </p>)}

                                        </Label>
                                    </section>
                                </Fragment>
                            ))}
                        </RadioGroup>
                    )}
                    {title === 'ระดับความเผ็ด' && spicyOptions && (
                        <RadioGroup
                            className="mt-2"
                            required={required > 0}
                            defaultValue={spicy}
                            onValueChange={(value) => {
                                setUserOptions({
                                    ...userOptions,
                                    [title]: value,
                                });
                            }}
                        >
                            {spicyOptions.map(({ name, price }, index) => (
                                <Fragment key={name}>
                                    {index !== 0 && (
                                        <div className="w-full h-[1px] bg-gray-200" />
                                    )}
                                    <section className="flex items-center gap-2 py-0.5">
                                        <RadioGroupItem
                                            value={name}
                                            id={`option-${title}-${name}`}
                                        />
                                        <Label
                                            htmlFor={`option-${title}-${name}`}
                                            className="flex justify-between w-full text-base text-gray-700 font-light"
                                        >
                                            {name}
                                            {price !== null && (<p className="flex flex-1 justify-end items-baseline font-light gap-1"> <span className="text-xs text-gray-400 font-light"> ฿ </span> {price} </p>)}
                                            {name === "เผ็ดน้อย" && price === null && (
                                                <p className="flex flex-1 justify-end items-baseline font-light gap-1">
                                                    🌶️
                                                </p>
                                            )}
                                            {name === "เผ็ดปกติ" && price === null && (
                                                <p className="flex flex-1 justify-end items-baseline font-light gap-1">
                                                    🌶️🌶️
                                                </p>
                                            )}
                                            {name === "เผ็ดมาก" && price === null && (
                                                <p className="flex flex-1 justify-end items-baseline font-light gap-1">
                                                    🌶️🌶️🌶️
                                                </p>
                                            )}
                                        </Label>
                                    </section>
                                </Fragment>
                            ))}
                        </RadioGroup>
                    )}
                    {title === 'เพิ่มไข่' && (
                        <RadioGroup
                            className="mt-2"
                            required={required > 0}
                            defaultValue={egg}
                            onValueChange={(value) => {
                                setUserOptions({
                                    ...userOptions,
                                    [title]: value,
                                });
                            }}
                        >
                            {options.map(({ name, price }, index) => (
                                <Fragment key={name}>
                                    {index !== 0 && (
                                        <div className="w-full h-[1px] bg-gray-200" />
                                    )}
                                    <section className="flex items-center gap-2 py-0.5">
                                        <RadioGroupItem
                                            value={name}
                                            id={`option-${title}-${name}`}
                                        />
                                        <Label
                                            htmlFor={`option-${title}-${name}`}
                                            className="flex justify-between w-full text-base text-gray-700 font-light"
                                        >
                                            {name}
                                            {price !== null && (<p className="flex flex-1 justify-end items-baseline font-light gap-1"> <span className="text-xs text-gray-400 font-light"> ฿ </span> {price} </p>)}

                                        </Label>
                                    </section>
                                </Fragment>
                            ))}
                        </RadioGroup>
                    )}
                    {title === 'ภาชนะ' && (
                        <RadioGroup
                            className="mt-2"
                            required={required > 0}
                            defaultValue={container}
                            onValueChange={(value) => {
                                setUserOptions({
                                    ...userOptions,
                                    [title]: value,
                                });
                            }}
                        >
                            {options.map(({ name, price }, index) => (
                                <Fragment key={name}>
                                    {index !== 0 && (
                                        <div className="w-full h-[1px] bg-gray-200" />
                                    )}
                                    <section className="flex items-center gap-2 py-0.5">
                                        <RadioGroupItem
                                            value={name}
                                            id={`option-${title}-${name}`}
                                        />
                                        <Label
                                            htmlFor={`option-${title}-${name}`}
                                            className="flex justify-between w-full text-base text-gray-700 font-light"
                                        >
                                            {name}
                                            {price !== null && (<p className="flex flex-1 justify-end items-baseline font-light gap-1"> <span className="text-xs text-gray-400 font-light"> ฿ </span> {price} </p>)}

                                        </Label>
                                    </section>
                                </Fragment>
                            ))}
                        </RadioGroup>
                    )}
                </section>
            ))}
            <aside className="flex flex-col px-4 py-4 border-b-4 gap-2">
                <header className="flex items-center gap-2.5">
                    <h2 className="flex gap-2 text-lg text-gray-700">
                        เพิ่มเติม
                    </h2>
                    <p className="text-gray-400 text-sm font-light">optional</p>
                </header>
                <textarea
                    className="text-gray-600 bg-gray-100 rounded p-3"
                    placeholder="เช่น ไม่ใส่ผัก"
                    rows={4}
                    value={detail}
                    onChange={(event) => {
                        setDetail(event.currentTarget.value)
                    }}
                />
                <footer className="flex justify-center items-center py-4 gap-3">
                    <button
                        className="flex justify-center items-center text-xl font-semibold text-red-500 w-12 h-12 border-2 rounded-lg"
                        type="button"
                        onClick={(event) => {
                            event.preventDefault()

                            if (total > 1) setTotal(total - 1)
                        }}
                    >
                        -
                    </button>
                    <input
                        className="w-16 h-12 bg-gray-100 text-center rounded-lg"
                        type="number"
                        min={0}
                        step="1"
                        value={total}
                        onChange={(event) => {
                            const value = event.currentTarget.valueAsNumber

                            if (!value) setTotal(1)
                            else setTotal(event.currentTarget.valueAsNumber)
                        }}
                    />
                    <button
                        className="flex justify-center items-center text-xl font-semibold text-red-500 w-12 h-12 border-2 rounded-lg"
                        type="button"
                        onClick={(event) => {
                            event.preventDefault()

                            setTotal(total + 1)
                        }}
                    >
                        +
                    </button>
                </footer>
            </aside>
            <footer className="sticky bottom-0 p-4 bg-white border-t-2">
                <button
                    className="w-full text-white text-xl bg-coral py-3 rounded"
                    type="submit"
                >
                    เพิ่มออเดอร์ - ฿ {format(price)}
                </button>
            </footer>
        </form>
    )
}