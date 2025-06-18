<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useThemeStore } from './stores/theme'
import { onMounted } from 'vue'
import { NeButton } from '@nethesis/vue-components'
import AppShell from '@/components/AppShell.vue'

const themeStore = useThemeStore()

onMounted(() => {
  // console.log('%c' + welcomeMsg, 'background: #0069a8; color: white;') ////
  themeStore.loadTheme()
})
</script>

<template>
  <AppShell />
  <!-- <div class="flex flex-col items-start gap-4 p-4"> ////
    <NeButton kind="primary" @click="themeStore.toggleTheme">
      Toggle theme, current: {{ themeStore.theme }}
    </NeButton>
    <nav class="flex gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <main>
      <RouterView />
    </main>
  </div> -->
</template>

<style scoped></style>
