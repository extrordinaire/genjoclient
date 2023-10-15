import { z } from 'zod'

const HTTP_MethodShema = z.enum([
  'CONNECT',
  'DELETE',
  'GET',
  'HEAD',
  'OPTIONS',
  'PATCH',
  'POST',
  'PUT',
  'TRACE',
])
type HTTP_Method = z.infer<typeof HTTP_MethodShema>

enum Emmiter {
  server = 'server',
  client = 'client',
}
const EmmiterSchema = z.nativeEnum(Emmiter)

const MessageSchema = z.object({
  emmiter: EmmiterSchema,
  data: z.string(),
})
type Message = z.infer<typeof MessageSchema>

const ConversationStatusSchema = z.enum(['idle', 'sending', 'sent', 'error'])
type ConversationStatus = z.infer<typeof ConversationStatusSchema>

export { Emmiter, MessageSchema }
export type { ConversationStatus, HTTP_Method, Message }

