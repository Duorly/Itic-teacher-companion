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
    modules: [
      '@nuxt/eslint',
      '@nuxt/image',
      '@nuxt/scripts',
      '@nuxt/ui',
      '@pinia/nuxt',
    ],
})