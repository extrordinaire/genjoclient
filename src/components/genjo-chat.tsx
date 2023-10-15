import { useConversation } from '@contexts/conversation-provider'
import { FunctionComponent } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import GenjoMessage from './genjo-message'

const GenjoChat: FunctionComponent = () => {
  const { conversation } = useConversation()

  const chatContainerRef = useRef<HTMLDivElement | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToLastMessage()
  }, [conversation])

  function scrollToLastMessage() {
    if (chatContainerRef.current) {
      const lastMessage = chatContainerRef.current.lastChild as HTMLElement

      if (lastMessage) {
        setTimeout(() => {
          lastMessage.scrollIntoView({ behavior: 'smooth' })
        }, 0)
      }
    }
    // console.log(chatEndRef.current)
    // setTimeout(() => {
    //   if (chatEndRef.current)
    //     chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    // }, 0)
  }

  return (
    <>
      <div
        tw='basis-full flex flex-col space-y-4 w-[850px] max-w-full h-full overflow-y-auto'
        ref={chatContainerRef}
      >
        {conversation.value.map((message, index) => (
          <GenjoMessage message={message} key={`message-${index}`} />
        ))}
        <div ref={chatEndRef} />
      </div>
    </>
  )
}

export default GenjoChat

