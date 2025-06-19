<script setup lang="ts">
import { useHandleSignInCallback } from '@logto/vue'
import router from '@/router'
// import { onMounted } from 'vue' ////

const { isLoading } = useHandleSignInCallback(() => {
  console.log('login success, redirect to home') ////

  // Redirect to home page on successful sign-in
  router.push('/')
})

// onMounted(() => { ////
//   console.log('login-redirect-view') ////
// })
</script>

<template>
  <div>
    <div>Login successful ////</div>
    <p v-if="isLoading">Redirecting... ////</p>
  </div>
</template>

<style scoped></style>
