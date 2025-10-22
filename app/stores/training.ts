import type {Training} from "~/utils/types/training.type";

export const useTrainingStore = defineStore('training', () => {
    const loading = ref(false)

    const training = ref<Training>();

    const trainings = ref<Training[]>();

    const getTotalTrainings = computed(() => trainings.value?.length)
    const getTotalStudents = computed(() => trainings.value?.map(tr => tr.totalStudents).reduce((a, b) => a + b, 0))

    const getTeacherTraining = async () => {
        loading.value = true

        const { data, error } = await useYpareoService<Training[]>("/groups/trainer/28558/formations")

        loading.value = false

        if (error.value) {
            await Promise.reject(error.value)
        }

        trainings.value = data.value

        return data.value
    }

    return { trainings, training, loading, getTeacherTraining, getTotalTrainings, getTotalStudents }
}, {
    persist: true,
},)