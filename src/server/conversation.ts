import { z } from 'zod'

const serverURL = import.meta.env.VITE_REACT_APP_API_PROXY

const PostConversationResponseSchema = z.object({
  response: z.string(),
  suggestions: z.array(z.string()).optional(),
})
type PostConversationResponse = z.infer<typeof PostConversationResponseSchema>

const PostConversationRequestSchema = z.object({
  message: z.string(),
  sessionID: z.string(),
  clientID: z.string(),
})
type PostConversationRequest = z.infer<typeof PostConversationRequestSchema>

async function postConversation(
  params: PostConversationRequest & { abortController?: AbortController },
): Promise<PostConversationResponse> {
  const {
    message,
    sessionID,
    clientID,
    abortController = new AbortController(),
  } = params

  const response = await fetch(`${serverURL}/api/v1/conversation`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: abortController.signal, // Use the signal from the AbortController
    body: JSON.stringify({
      sessionId: sessionID,
      clientId: clientID,
      message,
    }),
    mode: 'cors',
  })

  if (!response.ok) {
    throw new Error('Failed to post the conversation')
  }

  const responseJSON: PostConversationResponse = await response.json()

  return responseJSON
}

export { postConversation }

