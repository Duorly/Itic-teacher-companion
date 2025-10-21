import type {Credentials} from "~/utils/types/auth";

export const useAuthStore = defineStore('auth', () => {
    const count = ref(0)

    const loading = ref(false)

    const user = ref({
        email: "",
        username: "Chaouche"
    })

    const doubleCount = computed(() => count.value * 2)

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

        const { data, error } = await useAuthService("/login", {
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

        return data.value
    }

    return { user, loading, login, register, doubleCount }
})