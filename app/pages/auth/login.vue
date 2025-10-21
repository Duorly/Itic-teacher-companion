<script setup lang="ts">
const toast = useToast()

const authStore = useAuthStore()

const { loading } = storeToRefs(authStore)

const show = ref(false)

const payload = reactive({
  login: "CHAOUCHE",
  password: "Password@2025"
})

const login = async () => {
  await authStore.login(payload).then((res) => {
    toast.add({
      title: "Connexion réussi !",
    })

    navigateTo("/")
  }).catch(err => console.log(err))
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img src="/images/logo.svg" alt="Your Company" class="mx-auto h-9/10 w-auto">
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-100">Email</label>
          <div class="mt-2">
            <input id="email" v-model="payload.login" type="text" name="email" required autocomplete="email" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-100">Mot de passe</label>
            <div class="text-sm">
              <NuxtLink href="#" class="font-semibold text-indigo-400 hover:text-indigo-300">Mot de passe oublié ?</NuxtLink>
            </div>
          </div>
          <div class="mt-2">
            <UInput
                v-model="payload.password"
                placeholder="Password"
                :type="show ? 'text' : 'password'"
                :ui="{ trailing: 'pe-1' }"
                class="w-full"
                size="lg"
            >
              <template #trailing>
                <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="show ? 'Hide password' : 'Show password'"
                    :aria-pressed="show"
                    aria-controls="password"
                    @click="show = !show"
                />
              </template>
            </UInput>
          </div>
        </div>

        <div>
            <UButton color="primary" block :loading="loading" loading-icon="i-lucide-loader" type="submit">Se connecter</UButton>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        Vous n'avez pas encore de compte ?
        <NuxtLink to="/auth/register" class="font-semibold text-indigo-400 hover:text-indigo-300">Créer un compte</NuxtLink>
      </p>
    </div>
  </div>

</template>