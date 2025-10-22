// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {
      enabled: true,

      timeline: {
        enabled: true
      }
    },
    debug: true,
    css: ['~/assets/css/main.css'],
    ssr: false,
    modules: [
      '@nuxt/eslint',
      '@nuxt/image',
      '@nuxt/scripts',
      '@nuxt/ui',
      '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
    ],

    runtimeConfig: {
        // Private keys are only available on the server
        apiSecret: '123',

        // Public keys that are exposed to the client
        public: {
            gamingBaseUrl: process.env.NUXT_PUBLIC_GAMING_BASE_URL,
            authBaseUrl: process.env.NUXT_PUBLIC_AUTH_BASE_URL,
            ypareoBaseUrl: process.env.NUXT_PUBLIC_YPAREO_BASE_URL,
        },
    },
})