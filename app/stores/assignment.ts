import type {Training} from "~/utils/types/training.type";

export interface Assignment {
    title: string
    description: string
    type: string
    maxPoints: number
    dueDate: string | Date
    creatorId: number
    formationId: number
}

export const useAssignmentStore = defineStore('assignment', () => {

    const loading = ref<boolean>(false)

    const assignments = ref();

    const addAssignment = async (payload: Assignment) => {
        loading.value = true

        const { data, error } = await useGamingService(
            `assignments`,
            {
                method: 'POST',
                body: payload,
            }
        )

        loading.value = false

        if (error.value) {
            await Promise.reject(error.value)
        }

        console.log("%o", data.value)

        assignments.value = data.value

        return data.value
    }


    return { loading, addAssignment}
}, {
    persist: true,
},)