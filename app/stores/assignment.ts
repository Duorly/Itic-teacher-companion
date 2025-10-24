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

export interface AssignmentData {
    id: number
    title: string
    description: string
    type: string
    maxPoints: number
    createdAt: string
    updatedAt: any
    dueDate: string
    completed: boolean
    active: boolean
    creatorId: number
    formationId: number
    formationName: string
}

export const useAssignmentStore = defineStore('assignment', () => {

    const {$gamingFetch} = useNuxtApp()

    const loading = ref<boolean>(false)

    const assignments = ref<AssignmentData[]>();

    const addAssignment = async (payload: Assignment) => {
        try{
            loading.value = true

            const data = await $gamingFetch(
                `/assignments/new`,
                {
                    method: 'POST',
                    body: payload,
                }
            )

            console.log("%o", data)

            assignments.value = data

            return data
        }catch (e){
            await Promise.reject(e)
        } finally {
            loading.value = false
        }
    }

    const getAssignments = async () => {
        loading.value = true

        const { data, error } = await useGamingService<AssignmentData[]>(
            `/assignments/29/all`
        )

        loading.value = false

        if (error.value) {
            await Promise.reject(error.value)
        }

        console.log("%o", data.value)

        assignments.value = data.value

        return data.value
    }


    return { loading, assignments, addAssignment, getAssignments}
}, {
    persist: true,
},)