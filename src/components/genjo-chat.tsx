import { useConversation } from '@signals/conversation-provider'
import { FunctionComponent } from 'preact'

const GenjoChat: FunctionComponent = () => {
  const { conversation, pushMessage } = useConversation()

  pushMessage({
    message: {
      emmiter: 'client',
      message: 'message.value',
    },
  })

  return (
    <>
      <div tw='basis-full flex-col gap-2 w-full h-full'>
        {conversation.value.map((message, index) => (
          <div
            key={`message-${index}`}
            tw='px-4 py-2 bg-neutral-200 text-neutral-800'
          >
            <h6>{message.emmiter}</h6>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default GenjoChat

