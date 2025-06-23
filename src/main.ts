//  Copyright (C) 2025 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { config as fontawesomeConfig } from '@fortawesome/fontawesome-svg-core'
import { createLogto, type LogtoConfig, UserScope } from '@logto/vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { LOGTO_APP_ID, LOGTO_ENDPOINT } from './lib/config'

// prevent FontAwesome from automatically adding CSS (needed to fix icons style)
fontawesomeConfig.autoAddCss = false

// logto configuration
const logtoConfig: LogtoConfig = {
  endpoint: LOGTO_ENDPOINT,
  appId: LOGTO_APP_ID,
  scopes: [
    UserScope.Organizations,
    UserScope.Roles,
    UserScope.OrganizationRoles,
    UserScope.CustomData,
    UserScope.Profile,
    // 'backup:systems', ////
    // 'create:systems',
    // 'create:customers',
    // 'test:asdf',
  ],
  resources: [
    'https://y4uj0v.logto.app/api',
    'https://dev.my.nethesis.it/api/systems',
    'https://dev.my.nethesis.it/api/distributors',
    'https://dev.my.nethesis.it/api/resellers',
    'https://dev.my.nethesis.it/api/customers',
  ], //// ?
  includeReservedScopes: true,
}

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)
app.use(createLogto, logtoConfig)

app.mount('#app')
