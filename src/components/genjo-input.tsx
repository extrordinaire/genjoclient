import { signal } from '@preact/signals'
import { postConversation } from '@server/conversation'
import { useConversation } from '@signals/conversation-provider'
import { FunctionComponent, JSX } from 'preact'
import { useEffect } from 'preact/hooks'

type GenjoInputStatus = 'idle' | 'typing' | 'sending' | 'sent' | 'error'

const GenjoInput: FunctionComponent = () => {
  const message = signal<string>('')
  const status = signal<GenjoInputStatus>('idle')

  const { pushMessage } = useConversation()

  useEffect(() => {
    return () => {
      clearTimeout(goBackIdle)
    }
  }, [])

  let goBackIdle: NodeJS.Timeout

  function handleInput() {
    status.value = 'typing'
    clearTimeout(goBackIdle)
    goBackIdle = setTimeout(() => {
      status.value = 'idle'
    }, 300)
  }

  function handleChange(e: JSX.TargetedEvent<HTMLInputElement, Event>) {
    message.value = e.currentTarget.value
  }

  function handleSubmit(e: JSX.TargetedMouseEvent<HTMLFormElement>) {
    e.preventDefault()

    async function sendMessage() {
      try {
        status.value = 'sending'
        const response = await postConversation({
          sessionID: 'mysession',
          clientID: 'tg',
          message: message.value,
        })

        pushMessage({
          message: {
            emmiter: 'client',
            message: message.value,
          },
        })
        status.value = 'sent'
        message.value = ''

        pushMessage({
          message: {
            emmiter: 'server',
            message: response.response,
          },
        })

        console.log(response)
      } catch (error) {
        status.value = 'error'
        console.error(error)
      }
    }

    sendMessage()
  }

  return (
    <form onSubmit={handleSubmit} class='bg-rose-100 ' id='genjo-input'>
      <input
        type='text'
        onChange={handleChange}
        onInput={handleInput}
        value={message}
      />
      <button>send</button>
    </form>
  )
}

export default GenjoInput

