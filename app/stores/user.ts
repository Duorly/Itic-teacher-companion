export const useAuthStore = defineStore('auth', () => {
    const count = ref(0)

    const loading = ref(false)

    const user = ref({
        email: "",
        username: "Chaouche"
    })

    const doubleCount = computed(() => count.value * 2)

    function login() {
        count.value++
    }

    const register = async (payload: any) => {
        loading.value = true

        const { data, status, error } = await useAuthService("/register-teacher", {
            method: "POST",
            body: {
                ypareoLogin : payload.login,
                password : payload.password,
                confirmPassword : payload.password
            }
        })

        if (error.value) {
            await Promise.reject(error.value)
        }

        loading.value = false

        return data.value
    }

    return { user, loading, login, register, doubleCount }
})