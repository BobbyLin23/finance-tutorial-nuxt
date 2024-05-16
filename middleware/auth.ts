export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp()

  const userId = nuxtApp.ssrContext?.event.context.auth?.userId
  if (import.meta.server && !userId)
    return navigateTo('/sign-in')

  if (import.meta.client && !nuxtApp.$clerk.user)
    return navigateTo('/sign-in')
})
