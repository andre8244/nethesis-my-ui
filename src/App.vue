<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { useThemeStore } from './stores/theme'
import { computed, onMounted } from 'vue'
import AppShell from '@/components/AppShell.vue'
import { useRoute } from 'vue-router'
import { useTitle } from '@vueuse/core'
import { PRODUCT_NAME } from './lib/config'
import { useI18n } from 'vue-i18n'

const themeStore = useThemeStore()
const route = useRoute()
const { t } = useI18n()

const pageTitle = computed(() => {
  const routeName = route.name ? String(route.name) : ''

  if (!routeName || routeName === 'login') {
    return PRODUCT_NAME
  } else {
    const i18nPageTitle = t(`${routeName}.title`)
    return `${i18nPageTitle} - ${PRODUCT_NAME}`
  }
})

useTitle(pageTitle)

onMounted(() => {
  // console.log('%c' + welcomeMsg, 'background: #0069a8; color: white;') ////
  themeStore.loadTheme()
})
</script>

<template>
  <div>
    <AppShell v-if="route.path !== '/login'" />
    <!-- login page: don't show app shell -->
    <RouterView v-else />
  </div>
</template>

<style scoped></style>
