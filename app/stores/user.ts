export const useUserStore = defineStore('user', () => {
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

    return { user, loading, login, doubleCount }
})