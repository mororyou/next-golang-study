import z from 'zod'

const zTaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
const zTasksSchema = z.array(zTaskSchema)

const zEditedTaskSchema = z.object({
  id: z.number(),
  title: z.string(),
})

type Task = z.infer<typeof zTaskSchema>
type Tasks = z.infer<typeof zTasksSchema>
type EditedTask = z.infer<typeof zEditedTaskSchema>

export { zEditedTaskSchema, zTaskSchema, zTasksSchema }

export type { EditedTask, Task, Tasks }
