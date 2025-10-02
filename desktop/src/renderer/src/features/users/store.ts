import { create } from 'zustand'
import { User } from '@renderer/../../common/types'

interface State {
  user: User | null
}

interface Action {
  setCurrentUser: (newUser: User | null) => void
}

const initialState: State = {
  user: null
}

export const useUserStore = create<State & Action>()((set) => ({
  ...initialState,
  setCurrentUser(newUser) {
    set({ user: newUser })
  }
}))
