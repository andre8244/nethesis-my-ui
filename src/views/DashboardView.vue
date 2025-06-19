<!--
  Copyright (C) 2025 Nethesis S.r.l.
  SPDX-License-Identifier: GPL-3.0-or-later
-->

<script setup lang="ts">
import { useLogto } from '@logto/vue'
import { NeButton } from '@nethesis/vue-components'

// const { signIn, signOut, isAuthenticated, getIdTokenClaims } = useLogto() ////

const onClickSignIn = () => signIn('http://localhost:5173/login-redirect')
const onClickSignOut = () => signOut('http://localhost:5173/')
</script>

<template>
  <div>
    <div>DashboardView ////</div>
    <!-- isAuthenticated {{ isAuthenticated }} ////
    <NeButton v-if="!isAuthenticated" kind="primary" @click="onClickSignIn">Sign In</NeButton>
    <template v-else>
      <NeButton kind="danger" @click="onClickSignOut">Sign Out</NeButton>
    </template> -->
  </div>
</template>

<style scoped></style>
