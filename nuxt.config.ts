// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxtjs/supabase', 'nuxt-file-storage', '@pinia/nuxt', '@nuxtjs/i18n'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      alwaysRedirect: true,
      fallbackLocale: 'de'
    }
  },
  ssr: false
})