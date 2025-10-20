export default defineNuxtPlugin((nuxtApp) => {
    const userAuth = useCookie('token')
    const config = useRuntimeConfig()

    const $customFetch = $fetch.create({
        baseURL: config.public.gamingBaseUrl as string ?? 'https://api.nuxt.com',
        // onRequest({ request, options, error }) {
        //
        // },
        // onResponse({ response }) {
        //     // response._data = new myBusinessResponse(response._data)
        // },
        // async onResponseError({ response }) {
        //
        // },
    })
    // Expose to useNuxtApp().$customFetch
    return {
        provide: {
            customFetch: $customFetch,
        },
    }
})
