import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxt/image', '@vueuse/nuxt', '@pinia/nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  devServer: {
    port: 1204,
  },
  build: {
    transpile: ['vue-clerk', '@clerk/clerk-js'],
  },
  runtimeConfig: {
    public: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
  },
  components: [
    '~/components',
    {
      path: '~/components/accounts',
      pathPrefix: false,
    },
    {
      path: '~/components/ui',
      pathPrefix: false,
    },
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
})
