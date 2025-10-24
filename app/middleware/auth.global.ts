export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')

    // Si aucun token et la route n'est pas publique → redirection vers /login
    const publicRoutes = ['/auth/login', '/auth/register', 'ranking']

    if (!token.value && !publicRoutes.includes(to.path)) {
        return navigateTo('/auth/login')
    }
})