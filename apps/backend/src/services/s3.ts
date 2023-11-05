import { Elysia } from 'elysia'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { env } from './env'

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: `${env.ACCESS_KEY}`,
        secretAccessKey: `${env.SECRET_KEY}`
    }
})

export const s3 = new Elysia({ name: 's3' }).derive(() => {
    return {
        async upload(file?: Blob, prefix = '') {
            if (!file) return

            // @ts-ignore
            const Key = prefix + file.name ?? `${Date.now()}.jpg`

            await s3Client.send(
                new PutObjectCommand({
                    Key,
                    Bucket: env.BUCKET,
                    Body: new Uint8Array(await file.arrayBuffer())
                })
            )

            return `${env.R2_PUBLIC}/${Key}`
        },
        async uploadMultiple(files?: (string | Blob)[], prefix = '') {
            if (!files) return

            files = Array.isArray(files) ? files : [files]
            const endpoint: string[] = []

            for (const file of files) {
                if (typeof file === 'string') {
                    endpoint.push(file)
                    continue
                }

                // @ts-ignore
                const Key = prefix + file.name ?? `${Date.now()}.jpg`

                try {
                    await s3Client.send(
                        new PutObjectCommand({
                            Key,
                            Bucket: env.BUCKET,
                            Body: new Uint8Array(await file.arrayBuffer())
                        })
                    )
                } catch {
                    throw new Error(
                        'S3 Error: Invalid permission. Please contact developer for correct credential setting'
                    )
                }

                endpoint.push(`${env.R2_PUBLIC}/${Key}`)
            }

            console.log({ endpoint })

            return endpoint
        }
    }
})
