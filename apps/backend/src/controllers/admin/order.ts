import { Elysia, t } from 'elysia'
import { prisma } from '../../services/prisma'

export const action = new Elysia({ prefix: '/admin/menu' }).delete(
    '/id/:id',
    ({ params: { id } }) =>
        prisma.order.delete({
            where: {
                id
            }
        })
)
