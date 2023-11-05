import { Elysia, t } from 'elysia'
import { prisma } from '../../services/prisma'

export const action = new Elysia({ prefix: '/admin/action' })
    .model(
        'admin.actionTemplate',
        t.Array(
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
    )
    .model((model) => ({
        ...model,
        'admin.actionTemplate.optional': t.Partial(
            model['admin.actionTemplate']
        )
    }))
    .get('/', () => prisma.actionTemplate.findMany())
    .put(
        '/',
        ({ body }) =>
            prisma.actionTemplate.create({
                data: {
                    action: {
                        create: body.map(
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
            }),
        {
            body: 'admin.actionTemplate'
        }
    )
    .patch(
        '/id/:id',
        ({ params: { id }, body }) =>
            prisma.actionTemplate.update({
                where: {
                    id
                },
                data: body
            }),
        {
            body: 'admin.actionTemplate.optional'
        }
    )
    .delete('/id/:id', ({ params: { id } }) =>
        prisma.actionTemplate.delete({
            where: {
                id
            }
        })
    )
