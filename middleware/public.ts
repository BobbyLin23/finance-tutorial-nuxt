export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp()

  // `event.context.auth` here gets filled by the `server/middleware/clerk.ts`
  const userId = nuxtApp.ssrContext?.event.context.auth?.userId
  if (import.meta.server && userId)
    return navigateTo('/')

  // nuxtApp.$clerk is only available on the client-side
  if (import.meta.client && nuxtApp.$clerk.user)
    return navigateTo('/')
})
