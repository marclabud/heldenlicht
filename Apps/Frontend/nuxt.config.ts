export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  telemetry: false,
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/eslint'
  ],
  i18n: {
    defaultLocale: 'de',
    locales: [
      { code: 'de', name: 'Deutsch', language: 'de-CH', file: 'de.json' },
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' }
    ],
    strategy: 'no_prefix'
  },

  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  runtimeConfig: {
    public: {
      r2Url: process.env.NUXT_PUBLIC_R2_URL !== undefined ? process.env.NUXT_PUBLIC_R2_URL : '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://heldenlicht.ch'
    }
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://heldenlicht.ch',
    name: 'Heldenlicht — HeroFest Fotografie & Cosplay'
  },
  app: {
    head: {
      title: 'HELDENLICHT — HeroFest Fotografie & Cosplay',
      meta: [
        { name: 'theme-color', content: '#09090b' },
        { name: 'description', content: 'Hochmoderne Dark-Mode Fotogalerie für Cosplay und Convention-Atmosphäre am HeroFest (Bernexpo).' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
