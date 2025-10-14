<script setup lang="ts">
import type {NuxtError} from '#app'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <UApp>
    <UHeader>
      <template #title>
        <UColorModeImage
            light="/images/logo-white.svg"
            dark="/images/logo.svg"
        />
      </template>
      <template #right>
        <UColorModeButton/>
      </template>
    </UHeader>

    <UError
        :clear="{
      color: 'neutral',
      size: 'xl',
      icon: 'i-lucide-arrow-left',
      class: 'rounded-full'
    }"
        :error="error"/>

    <UFooter/>
  </UApp>
</template>
