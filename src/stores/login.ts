//  Copyright (C) 2025 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import isEmpty from 'lodash/isEmpty'
import { getJsonFromStorage } from '@nethesis/vue-components'

export type LoggedUser = {
  username: string
  name: string
}

export const useLoginStore = defineStore('login', () => {
  const username = ref('test') //// set to '' initially
  const token = ref('')
  const tokenRefreshedTime = ref(0)
  // const isRefreshingToken = ref(false) ////
  const isSessionExpired = ref(false)

  ////
  // const router = useRouter()
  // const route = useRoute()

  const isLoggedIn = computed(() => {
    return !isEmpty(username.value)
  })

  const loadUserFromStorage = () => {
    const loginInfo = getJsonFromStorage('loginInfo')

    if (loginInfo) {
      username.value = loginInfo.username
      token.value = loginInfo.token
      tokenRefreshedTime.value = loginInfo.tokenRefreshedTime
    }
  }

  ////
  // const login = async (user: string, password: string) => {
  //   const res = await axios.post(`${getStandaloneApiEndpoint()}/login`, {
  //     username: user,
  //     password,
  //   })
  //   const jwtToken = res.data.token
  //   tokenRefreshedTime.value = new Date().getTime()
  //   return jwtToken
  // }

  // const loginSuccessful = async (user: string, jwtToken: string) => {
  //   const loginInfo = {
  //     username: user,
  //     token: jwtToken,
  //     tokenRefreshedTime: tokenRefreshedTime.value,
  //   }
  //   saveToStorage('standaloneLoginInfo', loginInfo)

  //   username.value = user
  //   token.value = jwtToken

  //   const themeStore = useThemeStore()
  //   themeStore.loadTheme()
  //   isSessionExpired.value = false
  //   loadAppData(true)
  // }

  // const logout = async () => {
  //   await axios.post(
  //     `${getStandaloneApiEndpoint()}/logout`,
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token.value}`,
  //       },
  //     },
  //   )
  //   deleteFromStorage('standaloneLoginInfo')
  //   username.value = ''
  //   token.value = ''
  //   tokenRefreshedTime.value = 0
  //   router.push(`${getStandaloneRoutePrefix()}/`)
  // }

  // const refreshToken = async () => {
  //   if (isRefreshingToken.value) {
  //     return
  //   }
  //   isRefreshingToken.value = true

  //   try {
  //     const res = await axios.get(`${getStandaloneApiEndpoint()}/refresh`, {
  //       headers: {
  //         Authorization: `Bearer ${token.value}`,
  //       },
  //     })
  //     const jwtToken = res.data.token
  //     const refreshedTime = new Date().getTime()

  //     if (isStandaloneMode()) {
  //       const loginInfo = {
  //         username: username.value,
  //         token: jwtToken,
  //         tokenRefreshedTime: refreshedTime,
  //       }
  //       saveToStorage('standaloneLoginInfo', loginInfo)
  //     } else {
  //       // a controller is managing this unit
  //       const unit = route.params.unitId as string

  //       const unitLoginInfo = {
  //         unit,
  //         token: jwtToken,
  //         tokenRefreshedTime: refreshedTime,
  //       }

  //       saveToStorage(`unit-${unit}`, unitLoginInfo)
  //     }
  //     token.value = jwtToken
  //     tokenRefreshedTime.value = refreshedTime
  //     return jwtToken
  //   } catch (err) {
  //     console.error(err)
  //     return null
  //   } finally {
  //     isRefreshingToken.value = false
  //   }
  // }

  ////
  // // load data after login or on page load (if already logged in)
  // const loadAppData = async (justLoggedIn: boolean) => {
  //   // need to show setup wizard?
  //   try {
  //     await wizardStore.getWizardConfig()

  //     if (!wizardStore.isComplete) {
  //       // show setup wizard
  //       router.replace(`${getStandaloneRoutePrefix()}/wizard`)
  //       return
  //     }
  //     // wizard already completed

  //     // load uci pending changes
  //     const uciChangesStore = useUciPendingChangesStore()
  //     uciChangesStore.getChanges()

  //     // load unit hostname
  //     loadHostname()

  //     if (justLoggedIn) {
  //       // go to dashboard
  //       router.push(`${getStandaloneRoutePrefix()}/`)
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const setUsername = (user: string) => {
    username.value = user
  }

  const setToken = (tok: string) => {
    token.value = tok
  }

  const setTokenRefreshedTime = (refreshedTime: number) => {
    tokenRefreshedTime.value = refreshedTime
  }

  return {
    username,
    token,
    tokenRefreshedTime,
    isLoggedIn,
    isSessionExpired,
    loadUserFromStorage,
    // login, ////
    // logout, ////
    setUsername,
    setToken,
    setTokenRefreshedTime,
    ////
    // refreshToken,
    // loginSuccessful,
    // loadAppData,
  }
})
