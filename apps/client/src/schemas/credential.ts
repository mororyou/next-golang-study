import z from 'zod'

const zLoginCredentialSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

type LoginCredential = z.infer<typeof zLoginCredentialSchema>

const zSignUpCredentialSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(1),
})

type SignUpCredential = z.infer<typeof zSignUpCredentialSchema>

export { zLoginCredentialSchema, zSignUpCredentialSchema }
export type { LoginCredential, SignUpCredential }
