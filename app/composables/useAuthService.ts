import type { UseFetchOptions } from 'nuxt/app'

export function useAuthService<T>(
    url: string | (() => string),
    options: UseFetchOptions<T> = {},
) {
    return useFetch(url, {
        ...options,
        $fetch: useNuxtApp().$authFetch,
    })
}
