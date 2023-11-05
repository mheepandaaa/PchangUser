// import 'dotenv/config'
import { Elysia, t } from 'elysia'

import { Value } from '@sinclair/typebox/value'
import type { Static } from '@sinclair/typebox'

const Env = t.Object({
    ADMIN_PASSWORD: t.String(),
    BUCKET: t.String(),
    ACCOUNT_ID: t.String(),
    ACCESS_KEY: t.String(),
    SECRET_KEY: t.String(),
    R2_PUBLIC: t.String()
})

if (!Value.Check(Env, process.env)) throw Value.Errors(Env, process.env).First()

export const env: Static<typeof Env> = process.env
