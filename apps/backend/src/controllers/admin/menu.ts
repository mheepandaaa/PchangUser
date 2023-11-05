import { Elysia, t } from 'elysia'
import { s3, prisma } from '../../services'

export const menu = new Elysia({ prefix: '/admin/menu' })
    .use(s3)
    .model(
        'admin.menu',
        t.Object({
            title: t.Object({
                th: t.String(),
                en: t.String()
            }),
            price: t.Number(),
            image: t.Files({
                type: 'image',
                minItems: 1
            }),
            optionId: t.String()
        })
    )
    .model((model) => ({
        ...model,
        'admin.menu.optional': model['admin.menu']
    }))
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
        async ({ body: { title, price, optionId, image }, uploadMultiple }) =>
            prisma.menu.create({
                data: {
                    title: {
                        create: title
                    },
                    image: await uploadMultiple(image),
                    price,
                    option: {
                        connect: {
                            id: optionId
                        }
                    }
                }
            }),
        {
            body: 'admin.menu'
        }
    )
    .patch(
        '/id/:id',
        async ({
            params: { id },
            body: { title, price, optionId, image },
            uploadMultiple
        }) =>
            prisma.menu.update({
                where: {
                    id
                },
                data: {
                    title: {
                        update: title
                    },
                    price,
                    image: await uploadMultiple(image),
                    option: {
                        connect: {
                            id: optionId
                        }
                    }
                }
            }),
        {
            body: 'admin.menu.optional'
        }
    )
    .delete('/id/:id', ({ params: { id } }) =>
        prisma.menu.delete({
            where: {
                id
            }
        })
    )
