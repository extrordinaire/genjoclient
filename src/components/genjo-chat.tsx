import { useConversation } from '@contexts/conversation-provider'
import { FunctionComponent } from 'preact'
import GenjoMessage from './genjo-message'

const GenjoChat: FunctionComponent = () => {
  const { conversation } = useConversation()

  return (
    <>
      <div tw='basis-full flex flex-col space-y-4 w-[850px] max-w-full h-full overflow-y-auto'>
        {conversation.value.map((message, index) => (
          <GenjoMessage message={message} key={`message-${index}`} />
        ))}
      </div>
    </>
  )
}

export default GenjoChat

