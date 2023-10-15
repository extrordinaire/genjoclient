import { tw } from '@twind/preact'
import { FunctionComponent } from 'preact'
import GenjoSuggestion from './genjo-suggestion'

interface GenjoLandingProps {
  options: string[]
}

const GenjoLanding: FunctionComponent<GenjoLandingProps> = ({ options }) => {
  return (
    <section tw={tw`flex flex-col items-center basis-full w-[600px]`}>
      <h2 tw={tw`text-2xl font-bold text-slate-900`}>
        Let’s talk about the EV6
      </h2>
      <p
        tw={tw`text-neutral-900 font-semibold text-xl w-full text-center px-2 my-8`}
      >
        Introducing Kia’s EV6 converse tool. <br /> Here you can ask questions
        specific to the ev6.
      </p>
      <div tw={tw`space-y-4 max-w-full`}>
        {options.map((option, index) => (
          <GenjoSuggestion key={`suggestion-${index}`} text={option} />
        ))}
      </div>
    </section>
  )
}

export default GenjoLanding

