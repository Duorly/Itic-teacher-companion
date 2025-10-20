import type {HttpErrorResponse} from "~/utils/types/http_response";

export default defineNuxtPlugin((nuxtApp) => {
    const userAuth = useCookie('token')
    const config = useRuntimeConfig()
    const toast = useToast()

    const $authFetch = $fetch.create({
        baseURL: config.public.authBaseUrl as string ?? 'https://api.nuxt.com',
        // onRequest({ request, options, error }) {
        //
        // },
        // onResponse({ response }) {
        //     // response._data = new myBusinessResponse(response._data)
        // },
        async onResponseError({ response }) {
            const error = await response._data as HttpErrorResponse;

            toast.add({
                title: error?.message,
                description: error?.details ?? "",
                icon: 'heroicons:exclamation-circle-solid'
            })
        },
    })
    // Expose to useNuxtApp().$authFetch
    return {
        provide: {
            authFetch: $authFetch,
        },
    }
})
