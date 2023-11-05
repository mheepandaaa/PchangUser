import { Elysia, t } from 'elysia'
import { prisma, s3 } from '../services'

export const order = new Elysia({ prefix: '/order' })
    .use(s3)
    .model({
        order: t.Object({
            slip: t.File({
                type: 'image',
                maxSize: '5m'
            }),
            menu: t.Array(t.String())
        })
    })
    .get('', () => prisma.order.findMany())
    .get('/id/:id', ({ params: { id } }) =>
        prisma.order.findFirst({
            where: {
                id
            }
        })
    )
    .put(
        '',
        async ({ body: { menu, slip: slipImage }, upload }) => {
            const slip = await upload(slipImage)

            if (!slip) throw new Error('Failed to upload slip')

            return prisma.order.create({
                data: {
                    slip,
                    menu: {
                        connect: menu.map((id) => ({
                            id
                        }))
                    }
                }
            })
        },
        {
            body: 'order'
        }
    )
