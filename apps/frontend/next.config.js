const { join } = require('path')

const withPwa = require('next-pwa')
const withAnalyze = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})

const withPlugins = require('next-compose-plugins')
const pwaConfig = require('./tools/withPwa')

module.exports = withPlugins(
    [
        // [withPwa, pwaConfig] // Commented out if not using PWA plugin
        [withAnalyze]
    ],
    {
        swcMinify: true,
        async rewrites() {
            return [
                {
                    source: '/service-worker.js',
                    destination: '/_next/static/service-worker.js'
                }
            ]
        },
        images: {
            deviceSizes: [640, 750, 828, 1080],
            imageSizes: [16, 32, 48, 64, 96],
            path: '/_next/image',
            loader: 'default'
        },
        webpack(config, options) {
            config.resolve.alias = {
                ...config.resolve.alias,
                '@app': join(__dirname, 'src/app'),
                '@layouts': join(__dirname, 'src/layouts'),
                '@components': join(__dirname, 'src/components'),
                '@shared': join(__dirname, 'src/components/shared'),
                '@modules': join(__dirname, 'src/components/modules'),
                '@styles': join(__dirname, 'src/styles'),
                '@services': join(__dirname, 'src/services'),
                '@models': join(__dirname, 'src/models'),
                '@stores': join(__dirname, 'src/stores'),
                '@public': join(__dirname, 'public'),
                '@shadcn': join(__dirname, 'src/shadcn'),
                '@shadcn/components': join(__dirname, 'src/shadcn/components'),
                '@shadcn/utils': join(__dirname, 'src/shadcn/utils.ts'),
                '@': __dirname
            }

            // Add the following line to ignore ESLint warnings during builds:
            config.module.rules.push({
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        ignoreDuringBuilds: true // Set to true to ignore ESLint warnings
                    }
                }
            })

            return config
        },
        i18n: {
            locales: ['en-US'],
            defaultLocale: 'en-US'
        },
    }
)