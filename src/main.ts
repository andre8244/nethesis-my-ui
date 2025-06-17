//  Copyright (C) 2025 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { config } from '@fortawesome/fontawesome-svg-core'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

// prevent FontAwesome from automatically adding CSS (needed to fix icons style)
config.autoAddCss = false

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')
