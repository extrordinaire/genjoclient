import { Signal, signal } from '@preact/signals'
import { ConversationStatus, Message } from '@src/types'
import { createContext } from 'preact'

const conversationStatus = signal<ConversationStatus>('idle')

const conversation = signal<Message[]>([])

function pushMessage(params: { message: Message }) {
  const { message } = params
  conversation.value = [...conversation.value, message]
}

export const useConversation = () => {
  return { conversation, conversationStatus, pushMessage }
}

interface ConversationContextProvider {
  conversation: Signal<Message[]>
  conversationStatus: Signal<ConversationStatus>
  pushMessage: (params: { message: Message }) => void
}

const ConversationContext = createContext<
  ConversationContextProvider | undefined
>(undefined)

const ConversationProvider: preact.FunctionComponent<{
  children: preact.ComponentChildren
}> = ({ children }) => {
  return (
    <ConversationContext.Provider value={useConversation()}>
      {children}
    </ConversationContext.Provider>
  )
}

export { ConversationProvider }

