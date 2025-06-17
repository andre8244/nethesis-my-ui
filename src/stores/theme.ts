//  Copyright (C) 2025 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

//// get/set theme from localStorage

type Theme = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('system')

  // returns false if current theme is 'dark'; returns true if theme = 'light' or the system-preferred color scheme is light
  const isLight = computed(() => {
    switch (theme.value) {
      case 'light':
        return true
      case 'dark':
        return false
      default:
        // system theme
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return false
        } else {
          return true
        }
    }
  })

  function setTheme(newTheme: Theme) {
    theme.value = newTheme

    // add or remove dark class to document

    switch (newTheme) {
      case 'light':
        removeDarkClassFromDocument()
        break
      case 'dark':
        addDarkClassToDocument()
        break
      default:
        // system theme
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          addDarkClassToDocument()
        } else {
          removeDarkClassFromDocument()
        }
    }
  }

  function toggleTheme() {
    console.log('toggling theme, current:', theme.value) ////

    switch (theme.value) {
      case 'light':
        setTheme('dark')
        break
      case 'dark':
        setTheme('light')
        break
      default:
        // system theme
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setTheme('light')
        } else {
          setTheme('dark')
        }
    }
  }

  const addDarkClassToDocument = () => {
    document.documentElement.classList.add('dark')
  }

  const removeDarkClassFromDocument = () => {
    document.documentElement.classList.remove('dark')
  }

  function loadTheme() {
    // const username = getUsername() ////
    const theme = 'system' as Theme

    // if (username) { ////
    //   theme = getPreference('theme', username)
    // }
    setTheme(theme)
  }

  return { theme, isLight, setTheme, toggleTheme, loadTheme }
})
