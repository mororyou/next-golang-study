import z from 'zod'

const zCSRFTokenSchema = z.object({
  csrf_token: z.string(),
})

type CSRFToken = z.infer<typeof zCSRFTokenSchema>

export { zCSRFTokenSchema }

export type { CSRFToken }
