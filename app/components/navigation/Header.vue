<script setup lang="ts">

</script>

<template>
  <header class="mb-8">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-3xl font-bold text-slate-900 dark:text-white mb-2">Bienvenue, Professeur Martin</h2>
        <p class="text-slate-600 dark:text-slate-400">{{
            capitalize(new Date().toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }))
          }}</p>
      </div>
      <div class="flex items-center gap-3">
        <UColorModeSwitch/>
        <button class="p-2 flex items-center hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all border border-slate-200 dark:border-slate-700">
          <Icon name="lucide:search" class="w-5 h-5 text-slate-600 dark:text-slate-300"/>
        </button>
        <button class="p-2 flex items-center hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all border border-slate-200 dark:border-slate-700">
          <Icon name="lucide:filter" class="w-5 h-5 text-slate-600 dark:text-slate-300"/>
        </button>
        <button
            class="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
          <Icon name="lucide:plus" class="w-5 h-5"/>
          <span class="font-medium">Nouveau challenge</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>