import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'

import { admin } from './controllers'
import { order } from './controllers/order'

const app = new Elysia()
    .use(swagger())
    .use(admin)
    .use(order)
    .get('/', () => 'Hello Elysia')
    .listen(3001)

export type App = typeof app

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
