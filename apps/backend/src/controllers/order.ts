import { Elysia, t } from 'elysia'
import { prisma } from '../utils'

export const order = new Elysia({ prefix: '/order' })
    .get('/', () =>
        prisma.menu.findMany({
            include: {
                title: true,
                option: {
                    include: {
                        title: true,
                        action: true
                    }
                }
            }
        })
    )
    .put(
        '/',
        ({ body: { title, price, options } }) => {
            prisma.menu.create({
                data: {
                    title: {
                        create: title
                    },
                    price,
                    option: {
                        create: options.map(({ action, required, title }) => ({
                            title: {
                                create: title
                            },
                            required,
                            action: {
                                connect: {
                                    id: action
                                }
                            }
                        }))
                    }
                }
            })
        },
        {
            body: t.Object({
                title: t.Object({
                    th: t.String(),
                    en: t.String()
                }),
                price: t.Number(),
                options: t.Array(
                    t.Object({
                        title: t.Object({
                            th: t.String(),
                            en: t.String()
                        }),
                        required: t.Number({
                            min: 0
                        }),
                        action: t.String()
                    })
                )
            })
        }
    )
