import { Elysia, t } from 'elysia'
import { prisma } from '../../services/prisma'

export const action = new Elysia({ prefix: '/admin/menu' })
    .model(
        'order.update',
        t.Partial(
            t.Object({
                status: t.Union([
                    t.Literal('review'),
                    t.Literal('approved'),
                    t.Literal('wait_for_payment'),
                    t.Literal('preparing'),
                    t.Literal('served')
                ])
            })
        )
    )
    .patch(
        '/id/:id',
        ({ params: { id }, body }) =>
            prisma.order.update({
                where: {
                    id
                },
                data: body
            }),
        {
            body: 'order.update'
        }
    )
    .delete('/id/:id', ({ params: { id } }) =>
        prisma.order.delete({
            where: {
                id
            }
        })
    )
