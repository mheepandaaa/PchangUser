import { edenTreaty } from '@elysiajs/eden'
import type { App } from '../../../backend/src'

const { NEXT_PUBLIC_API_ENDPOINT } = process.env

if (!NEXT_PUBLIC_API_ENDPOINT)
    throw new Error("Missing env 'NEXT_PUBLIC_API_ENDPOINT'")

export const api = edenTreaty<App>(NEXT_PUBLIC_API_ENDPOINT)
