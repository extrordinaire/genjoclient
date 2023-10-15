import { ConversationProvider } from '@contexts/conversation-provider.tsx'
import { install } from '@twind/core'
import { setup } from '@twind/preact'
import { render } from 'preact'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import config from '../twind.config.js'
import { App } from './app.tsx'

install(config)

setup({
  // Optional define props to use
  props: {
    // tw: false, // to disable
    // css: false, // to disable
    // className: true, // to enable
  },
  /* other twind configuration options */
})

render(
  <ConversationProvider>
    <App />
  </ConversationProvider>,
  document.getElementById('app')!,
)

