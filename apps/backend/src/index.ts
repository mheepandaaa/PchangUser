import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'

import { admin } from './controllers'

const app = new Elysia()
    .use(swagger())
    .use(admin)
    .get('/', () => 'Hello Elysia')
    .listen(3001)

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
