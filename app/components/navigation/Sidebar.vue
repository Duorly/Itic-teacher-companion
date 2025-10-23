<script setup lang="ts">

const menuItems = [
  {id: 'overview', label: 'Vue d\'ensemble', icon: 'lucide:trending-up', url: '/'},
  {id: 'classes', label: 'Classes', icon: 'lucide:users', url: '/classes'},
  {id: 'devoirs', label: 'Devoirs', icon: 'lucide:file-text', url: '/devoirs'},
  {id: 'calendrier', label: 'Calendrier', icon: 'lucide:calendar', url: '/calendrier'},
  {id: 'notes', label: 'Notes', icon: 'lucide:award', url: '/notes'}
];
</script>

<template>
  <aside
      class="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 p-6">
    <div class="flex items-center gap-3 mb-8 p-4">
      <UColorModeImage
          light="/images/logo-white.svg"
          dark="/images/logo.svg"
          class="w-full"
      />
    </div>

    <nav class="space-y-2">
      <ULink
          v-for="item in menuItems"
          :key="item.id"
          raw :to="item?.url"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
          active-class="bg-blue-50 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-300"
          inactive-class="text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
        <Icon :name="item.icon" class="w-5 h-5"/>
        <span>{{ item.label }}</span>
      </ULink>
    </nav>


    <div class="absolute bottom-6 left-6 right-6">
      <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white">
        <p class="text-sm font-medium mb-2">Besoin d'aide ?</p>
        <p class="text-xs opacity-90 mb-3">Consultez notre guide</p>
        <button
            class="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 text-sm font-medium transition-all">
          En savoir plus
        </button>
      </div>
    </div>
  </aside>
</template>