import { useConversation } from '@contexts/conversation-provider'
import { Emmiter } from '@src/types'
import { tw } from '@twind/preact'
import { FunctionComponent } from 'preact'

interface GenjoSuggestionProps {
  text: string
}

const GenjoSuggestion: FunctionComponent<GenjoSuggestionProps> = ({ text }) => {
  const { sendMessage } = useConversation()

  function pushOption() {
    sendMessage({
      message: {
        emmiter: Emmiter.client,
        data: text,
      },
    })
  }

  return (
    <button
      tw={tw`px-6 py-3 font-semibold rounded-md shadow-md shadow-slate-500 bg-neutral-100 text-neutral-900 w-full border-neutral-200 border-1`}
      onClick={pushOption}
    >
      {text}
    </button>
  )
}

export default GenjoSuggestion

