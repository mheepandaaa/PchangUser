import { Elysia } from 'elysia'
import { order } from './controllers/order'
import { action } from './controllers/action'
import { swagger } from '@elysiajs/swagger'

const app = new Elysia()
    .use(swagger())
    .use(action)
    .use(order)
    .get('/', () => 'Hello Elysia')
    .listen(3001)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
