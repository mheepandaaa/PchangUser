import { Elysia, t } from 'elysia'
import { prisma } from '../../services/prisma'

export const option = new Elysia({ prefix: '/admin/option' })
    .model(
        'admin.option',
        t.Union([
            t.Object({
                title: t.Object({
                    th: t.String(),
                    en: t.String()
                }),
                actionId: t.String(),
                required: t.Number()
            }),
            t.Object({
                title: t.Object({
                    th: t.String(),
                    en: t.String()
                }),
                required: t.Number(),
                actions: t.Array(
                    t.Object({
                        name: t.Object({
                            th: t.String(),
                            en: t.String()
                        }),
                        value: t.Object({
                            th: t.String(),
                            en: t.String()
                        })
                    })
                )
            })
        ])
    )
    .model((model) => ({
        ...model,
        'admin.option.optional': model['admin.option']
    }))
    .get('/', () => prisma.menuOption.findMany())
    .put(
        '/',
        ({ body }) => {
            const { title, required } = body

            if ('actionId' in body) {
                const { actionId } = body

                return prisma.menuOption.create({
                    data: {
                        title: {
                            create: title
                        },
                        actionId,
                        required
                    }
                })
            } else {
                const { actions } = body

                return prisma.menuOption.create({
                    data: {
                        title: {
                            create: title
                        },
                        required,
                        action: {
                            create: {
                                action: {
                                    create: actions.map(
                                        ({
                                            name: { th: nameTh, en: nameEn },
                                            value: { th: valueTh, en: valueEn }
                                        }) => ({
                                            nameEn,
                                            nameTh,
                                            valueTh,
                                            valueEn
                                        })
                                    )
                                }
                            }
                        }
                    }
                })
            }
        },
        {
            body: 'admin.option'
        }
    )
    .patch(
        '/id/:id',
        ({ params: { id }, body }) => {
            const { title, required } = body

            if ('actionId' in body) {
                const { actionId } = body

                return prisma.menuOption.update({
                    where: {
                        id
                    },
                    data: {
                        ...body,
                        title: {
                            update: title
                        }
                    }
                })
            } else {
                const { actions } = body

                return prisma.menuOption.create({
                    data: {
                        title: {
                            create: title
                        },
                        required,
                        action: {
                            create: {
                                action: {
                                    create: actions.map(
                                        ({
                                            name: { th: nameTh, en: nameEn },
                                            value: { th: valueTh, en: valueEn }
                                        }) => ({
                                            nameEn,
                                            nameTh,
                                            valueTh,
                                            valueEn
                                        })
                                    )
                                }
                            }
                        }
                    }
                })
            }
        },
        {
            body: 'admin.option.optional'
        }
    )
    .delete('/id/:id', ({ params: { id } }) =>
        prisma.menuOption.delete({
            where: {
                id
            }
        })
    )
