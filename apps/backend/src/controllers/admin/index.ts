import { Elysia } from 'elysia'

import { menu } from './menu'
import { action } from './action'
import { option } from './option'
import { order } from '../order'

export const admin = new Elysia({
    name: 'controller/admin'
}).guard(
    {
        'beforeHandle': () => 
        detail: {
            tags: ['admin'],
        }
    },
    (app) => app.use(menu).use(action).use(option).use(order)
)
