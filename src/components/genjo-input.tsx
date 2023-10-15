import GenjoSuggestion from '@components/genjo-suggestion'
import { useConversation } from '@contexts/conversation-provider'
import { batch, useComputed, useSignal } from '@preact/signals'
import { Emmiter } from '@src/types'
import { tw } from '@twind/preact'
import { FunctionComponent, JSX } from 'preact'
import { useEffect } from 'preact/hooks'

type GenjoInputStatus = 'idle' | 'typing' | 'sending' | 'sent' | 'error'

const GenjoInput: FunctionComponent = () => {
  const inputText = useSignal<string>('')
  const isSubmittable = useComputed<boolean>(() => inputText.value.length > 0)
  const status = useSignal<GenjoInputStatus>('idle')

  const { sendMessage, suggestions } = useConversation()

  useEffect(() => {
    return () => {
      clearTimeout(goBackIdle)
    }
  }, [])

  let goBackIdle: NodeJS.Timeout

  function handleInput(e: JSX.TargetedEvent<HTMLInputElement, Event>) {
    clearTimeout(goBackIdle)
    batch(() => {
      status.value = 'typing'
      inputText.value = e.currentTarget.value
    })
    goBackIdle = setTimeout(() => {
      status.value = 'idle'
    }, 300)
  }

  function handleSubmit(e: JSX.TargetedMouseEvent<HTMLFormElement>) {
    e.preventDefault()

    async function postMessage() {
      const prev_messageData = inputText.value
      console.log(prev_messageData)
      inputText.value = ''
      console.log(inputText.value)

      try {
        status.value = 'sending'
        await sendMessage({
          message: {
            emmiter: Emmiter.client,
            data: prev_messageData,
          },
        })
        status.value = 'sent'
      } catch (error) {
        status.value = 'error'
        console.log('hello')
        inputText.value = prev_messageData
        console.error(error)
      }
    }

    console.log(inputText.value)
    console.log(isSubmittable.value, isSubmittable.peek())

    if (isSubmittable.value) postMessage()
  }

  return (
    <>
      {suggestions.value.length > 0 && (
        <div tw={tw`flex flex-col`}>
          <p tw={tw`text-neutral-700 text-sm py-3 px-6 my-2 font-semibold`}>
            Related questions
          </p>
          <div tw={tw`flex flex-col gap-2`}>
            {suggestions.value.map((suggestion, index) => (
              <GenjoSuggestion key={`suggestion-${index}`} text={suggestion} />
            ))}
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        tw={tw`bg-neutral-100 flex p-1 border-neutral-800 border-2 rounded-md w-[850px] max-w-full shadow-lg`}
        id='genjo-input-wrapper'
      >
        <input
          id='genjo-input'
          onInput={handleInput}
          placeholder={'Ask your question here'}
          tw={tw`font-medium text-base basis-full min-w-0 outline-none bg-transparent pl-8 placeholder:text-opacity-70`}
          type='text'
        />
        {status.value === 'typing' && (
          <button tw={tw`h-full  bg-red-600`}>erase</button>
        )}
        <button
          tw={tw`rounded-md bg-neutral-800 px-8 py-3 text-neutral-100 uppercase`}
        >
          ask
        </button>
      </form>
    </>
  )
}

export default GenjoInput

