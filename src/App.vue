<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { useThemeStore } from './stores/theme'
import { onMounted } from 'vue'
import AppShell from '@/components/AppShell.vue'
import { useLogto } from '@logto/vue'
import { NeButton } from '@nethesis/vue-components'
import { useRoute } from 'vue-router'
import { SIGN_OUT_REDIRECT_URI, LOGIN_REDIRECT_URI } from './lib/config'

const themeStore = useThemeStore()
//// use store instead?
const { signIn, signOut, isAuthenticated } = useLogto()
const route = useRoute()

const onClickSignIn = () => signIn(LOGIN_REDIRECT_URI)
const onClickSignOut = () => signOut(SIGN_OUT_REDIRECT_URI)

onMounted(() => {
  // console.log('%c' + welcomeMsg, 'background: #0069a8; color: white;') ////
  themeStore.loadTheme()
})
</script>

<template>
  <div>
    <!-- <NeButton kind="danger" @click="onClickSignOut">Sign Out</NeButton> //// -->
    <!-- <div class="text-2xl">isAuthenticated {{ isAuthenticated }}</div>
    <NeButton kind="danger" @click="onClickSignOut">Sign Out</NeButton>
    <NeButton v-if="!isAuthenticated" kind="primary" @click="onClickSignIn">Sign In</NeButton> -->
    <AppShell v-if="route.path !== '/login'" />
    <RouterView v-else />
  </div>
</template>

<style scoped></style>
