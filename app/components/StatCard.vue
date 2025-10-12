<template>
  <div class="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all">
    <div class="flex items-center justify-between mb-4">
      <div :class="[stat.color, 'w-12 h-12 rounded-lg flex items-center justify-center']">
        <Icon :name="stat.icon" class="w-6 h-6 text-white" />
      </div>
      <span class="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900 px-2 py-1 rounded">
        {{ stat.change }}
      </span>
    </div>
    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-1">{{ stat.value }}</h3>
    <p class="text-slate-600 dark:text-slate-400 text-sm">{{ stat.label }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stat: {
    label: string
    value: string
    icon: string
    change: string
    color: string
  }
}>()
</script>
