import { Elysia, t } from 'elysia'
import { prisma } from '../utils'

export const action = new Elysia({ prefix: '/action' }).put(
    '/',
    ({ body }) => {
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
        })
    },
    {
        body: t.Array(
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
    }
)
