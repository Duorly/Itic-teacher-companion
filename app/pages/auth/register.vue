<script setup lang="ts">
const toast = useToast()

const authStore = useAuthStore()

const { loading } = storeToRefs(authStore)

const payload = reactive({
    login: "CHAOUCHE",
    password: "Password@2025",
    password_confirmation: "Password@2025"
})

const register = async () => {
  await authStore.register(payload).then((res) => {
    toast.add({
        title: "Compte créé avec succès",
        description: "Veuillez vous connecter",
    })

    navigateTo("/auth/login")
  }).catch(err => console.log(err))
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="/images/logo.svg" alt="Your Company" class="mx-auto w-auto">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Inscrivez-vous à votre compte</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="register">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-100">Email</label>
          <div class="mt-2">
            <input id="email" v-model="payload.login" type="text" name="email" required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" >
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Mot de passe</label>
          </div>
          <div class="mt-2">
            <InputsPasswordStrength v-model="payload.password" />
          </div>

        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Confirmation du mot  de passe</label>
            <div class="text-sm">
              <div class="flex items-center space-x-2 font-semibold text-indigo-400 hover:text-indigo-300">
                <span>{{ payload.password === payload.password_confirmation ? "Valide" : "Non valide"}}</span>
                <Icon v-if="payload.password === payload.password_confirmation" class="text-green-500" name="ic:outline-check-circle"/>
                <Icon v-else class="text-red-500" name="lucide:x"/>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" v-model="payload.password_confirmation" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" >
          </div>

        </div>

        <div>
            <UButton :disabled="payload.password !== payload.password_confirmation" class="cursor-pointer" color="primary" block :loading="loading" loading-icon="i-lucide-loader" size="lg" type="submit">S'inscrire</UButton>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        Vous avez déjà un compte ?
        <NuxtLink to="/auth/login" class="font-semibold text-indigo-400 hover:text-indigo-300">Se connecter</NuxtLink>
      </p>
    </div>
  </div>

</template>