import type {Training} from "~/utils/types/training.type";
import {useAuthStore} from "~/stores/user";
import type {Student} from "~/utils/types/student.type";

export const useTrainingStore = defineStore('training', () => {
    const authStore = useAuthStore()

    const loading = ref(false)

    const training = ref<Training>();

    const training_students = ref<Student[]>()

    const trainings = ref<Training[]>();

    const getTotalTrainings = computed(() => trainings.value?.length)
    const getTotalStudents = computed(() => trainings.value?.map(tr => tr.totalStudents).reduce((a, b) => a + b, 0))

    const getTeacherTraining = async () => {
        loading.value = true

        const { data, error } = await useGamingService<Training[]>(
            `trainer/${authStore.user?.ypareoId}/formations-with-classes`
        )

        loading.value = false

        if (error.value) {
            await Promise.reject(error.value)
        }

        console.log("%o", data.value)

        trainings.value = data.value

        return data.value
    }

    const getTrainingById = (id : number) => {
        training.value = trainings.value?.find(tr => tr.id === id)
        return (id: number) => {
            return trainings.value?.find(tr => tr.id === id)
        }
    }

    const getTeacherStudentsByTraining = async (id: number | string) => {
        loading.value = true

        const { data, error } = await useGamingService<Student[]>(`/formations/${id}/students`)

        loading.value = false

        if (error.value) {
            await Promise.reject(error.value)
        }

        console.log("%o", data.value)

        training_students.value = data.value

        return data.value
    }

    return { trainings, training, training_students, loading, getTeacherTraining, getTrainingById, getTeacherStudentsByTraining, getTotalTrainings, getTotalStudents }
}, {
    persist: true,
},)