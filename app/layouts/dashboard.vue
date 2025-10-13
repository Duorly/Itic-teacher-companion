<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Sidebar -->
    <NavigationSidebar/>
    <!-- Main Content -->
    <main class="ml-64 p-8 bg-white dark:bg-gray-900">
      <!-- Header -->
      <NavigationHeader/>
      <slot/>
    </main>
  </div>
</template>

<style scoped>

</style>