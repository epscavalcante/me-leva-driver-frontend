import Echo from 'laravel-echo'
import type { App } from 'vue'
import Pusher from 'pusher-js'
import { echoInjectionKey } from '@/config/app/injectionKeys'

export default {
  install(app: App, options: Options) {
    const echo = new Echo({
      broadcaster: 'reverb',
      client: new Pusher(options.key, {
        cluster: '',
        forceTLS: false,
        httpHost: options.wsHost,
        wsHost: options.wsHost,
        wsPort: options.wsPort,
      }),
      ...options,
    })

    app.config.globalProperties.$echo = echo
    app.provide(echoInjectionKey, echo)
  },
}

export type EchoType = Echo<'reverb'>

type Options = {
  key: string
  wsHost: string
  wsPort: number
  wssPort: number
  forceTLS: boolean
  enabledTransports: string[]
}
