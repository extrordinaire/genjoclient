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

const EmmiterSchema = z.enum(['server', 'client'])
type Emmiter = z.infer<typeof EmmiterSchema>

const MessageSchema = z.object({
  emmiter: EmmiterSchema,
  message: z.string(),
})
type Message = z.infer<typeof MessageSchema>

const ConversationStatusSchema = z.enum(['idle', 'sending', 'sent', 'error'])
type ConversationStatus = z.infer<typeof ConversationStatusSchema>

export { MessageSchema }
export type { ConversationStatus, Emmiter, HTTP_Method, Message }

