import { create } from 'zustand'
import { EditedTask } from '../schemas'

type TaskState = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
}

const initialState: EditedTask = {
  id: 0,
  title: '',
}

const useTaskStore = create<TaskState>((set) => ({
  editedTask: initialState,
  updateEditedTask: (payload: EditedTask) => {
    set({ editedTask: payload })
  },
  resetEditedTask: () => {
    set({ editedTask: initialState })
  },
}))

export default useTaskStore
