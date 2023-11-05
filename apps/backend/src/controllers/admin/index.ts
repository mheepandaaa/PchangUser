import { Elysia } from 'elysia'
import bearer from '@elysiajs/bearer'

import { menu } from './menu'
import { action } from './action'
import { option } from './option'
import { order } from '../order'

import { env } from '../../services'

export const admin = new Elysia({
    name: 'controller/admin'
})
    .use(bearer())
    .guard(
        {
            beforeHandle: ({ bearer }) => bearer === env.ADMIN_PASSWORD,
            detail: {
                tags: ['admin']
            }
        },
        (app) => app.use(menu).use(action).use(option).use(order)
    )
