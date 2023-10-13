import GenjoChat from '@components/genjo-chat'
import GenjoInput from '@components/genjo-input'
import { ConversationProvider } from '@signals/conversation-provider'
import { tw } from '@twind/core'

export function App() {
  return (
    <>
      <div class='w-screen h-screen'>
        <ConversationProvider>
          <section
            tw={tw(
              `w-full h-full bg-red-100 flex flex-col justify-center items-center p-10`,
            )}
            id='genjo-frame'
          >
            <GenjoChat />
            <GenjoInput />
          </section>
        </ConversationProvider>
      </div>
    </>
  )
}

