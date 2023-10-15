import { Signal, signal } from '@preact/signals'
import { postConversation } from '@server/conversation'
import { ConversationStatus, Emmiter, Message } from '@src/types'
import { createContext } from 'preact'

const conversationStatus = signal<ConversationStatus>('idle')

const conversation = signal<Message[]>([])

const suggestions = signal<string[]>([])

function pushMessage(params: { message: Message }) {
  const { message } = params
  conversation.value = [...conversation.value, message]
}

async function sendMessage(params: { message: Message }) {
  const { data, emmiter } = params.message
  try {
    pushMessage({
      message: {
        emmiter,
        data,
      },
    })

    const response = await postConversation({
      sessionID: 'mysession',
      clientID: 'tg',
      message: data,
    })

    pushMessage({
      message: {
        emmiter: Emmiter.server,
        data: response.response,
      },
    })

    suggestions.value = response.suggestions || []

    console.log(response)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useConversation = () => {
  return {
    conversation,
    conversationStatus,
    pushMessage,
    sendMessage,
    suggestions,
  }
}

interface ConversationContextProvider {
  conversation: Signal<Message[]>
  conversationStatus: Signal<ConversationStatus>
  pushMessage: (params: { message: Message }) => void
  sendMessage: (params: { message: Message }) => Promise<void>
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

