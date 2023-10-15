import GenjoChat from '@components/genjo-chat'
import GenjoInput from '@components/genjo-input'
import GenjoLanding from '@components/genjo-landing'
import { useConversation } from '@contexts/conversation-provider'
import { tw } from '@twind/preact'

export function App() {
  const { conversation } = useConversation()

  return (
    <>
      <div class='w-screen h-screen'>
        <section
          tw={tw`w-full h-full bg-neutral-50 flex flex-col justify-center items-center p-10`}
          id='genjo-frame'
        >
          {conversation.value.length && conversation.value.length > 0 ? (
            <GenjoChat />
          ) : (
            <GenjoLanding
              options={[
                'I’ve never had an electric car before, what are the advantages?',
                'How does the ev6 compare to other eletrics?',
                'How far can I go on a single charge?',
              ]}
            />
          )}
          <GenjoInput />
          <p tw={tw`text-neutral-700 text-sm pt-2 font-semibold`}>
            Ev6 Converse is an AI tool, we promise you’ll get an answer, but we
            don’t guarantee it will be 100% accurate.
          </p>
        </section>
      </div>
    </>
  )
}

