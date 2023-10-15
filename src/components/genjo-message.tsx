import { Emmiter, Message } from '@src/types'
import { tw } from '@twind/preact'
import { FunctionComponent } from 'preact'

interface GenjoMessageProps {
  message: Message
}

const GenjoMessage: FunctionComponent<GenjoMessageProps> = ({ message }) => {
  const { emmiter, data } = message
  return (
    <div
      tw={tw`px-4 py-2  text-neutral-800 font-semibold w-fit ${
        emmiter === Emmiter.client
          ? 'bg-gray-100 rounded-tl-xl rounded-tr-xl rounded-bl-xl self-end'
          : 'bg-indigo-100 rounded-tl-xl rounded-tr-xl rounded-br-xl self-start'
      }`}
    >
      <h6 tw={tw`text-neutral-500 text-sm`}>{emmiter}</h6>
      <p
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: data }}
        tw={tw`text-base`}
      />
    </div>
  )
}

export default GenjoMessage

