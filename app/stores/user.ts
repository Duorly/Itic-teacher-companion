import type {Credentials} from "~/utils/types/auth.type";
import type {AuthResponse, UserInfo} from "~/utils/types/user.type";

export const useAuthStore = defineStore('auth', () => {

    const {$authFetch} = useNuxtApp()

    const token = useCookie('token')
    const refresh_token = useCookie('refresh_token')

    const loading = ref(false)

    const user = ref<UserInfo | null>()

    const getAuthUser = computed(() => user.value)

    const register = async (payload: Credentials) => {
        loading.value = true

        try {
            return await $authFetch<AuthResponse>("/register-teacher", {
                method: "POST",
                body: {
                    ypareoLogin: payload.login,
                    password: payload.password,
                    confirmPassword: payload.password_confirmation
                }
            })

        } catch (e) {
            await Promise.reject(e)
        } finally {
            loading.value = false
        }
    }

    const login = async (payload: Credentials) => {

        try {
            loading.value = true

            const data = await $authFetch<AuthResponse>("/login", {
                method: "POST",
                body: {
                    ypareoLogin: payload.login,
                    password: payload.password,
                }
            })

            user.value = data?.userInfo
            token.value = data?.accessToken
            refresh_token.value = data?.refreshToken

            return data;
        } catch (e) {
            await Promise.reject(e)
        } finally {
            loading.value = false
        }
    }

    return {user, loading, login, register, getAuthUser}
}, {
    persist: true,
},)