import type {Credentials} from "~/utils/types/auth.type";
import type {AuthResponse, UserInfo} from "~/utils/types/user.type";

export const useAuthStore = defineStore('auth', () => {
    const token = useCookie('token')
    const refresh_token = useCookie('refresh_token')

    const loading = ref(false)

    const user = ref<UserInfo | null>()

    const getAuthUser = computed(() => user.value)

    const register = async (payload: Credentials) => {
        loading.value = true

        const { data, error } = await useAuthService("/register-teacher", {
            method: "POST",
            body: {
                ypareoLogin : payload.login,
                password : payload.password,
                confirmPassword : payload.password_confirmation
            }
        })

        loading.value = false

        if (error.value) {
            await Promise.reject(error.value)
        }

        return data.value
    }

    const login = async (payload : Credentials) => {
        loading.value = true

        const { data, error } = await useAuthService<AuthResponse>("/login", {
            method: "POST",
            body: {
                ypareoLogin : payload.login,
                password : payload.password,
            }
        })

        loading.value = false

        if (error.value) {
            await Promise.reject(error.value)
        }

        user.value = data.value?.userInfo
        token.value = data.value?.accessToken
        refresh_token.value = data.value?.refreshToken


        return data.value
    }

    return { user, loading, login, register, getAuthUser }
}, {
    persist: true,
},)