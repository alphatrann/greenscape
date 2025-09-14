import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from './types'

interface State {
  user: User | null
}

interface Action {
  setCurrentUser: (newUser: User | null) => void
}

const initialState: State = {
  user: null
}

export const useUserStore = create<State & Action>()(
  persist(
    (set) => ({
      ...initialState,
      setCurrentUser(newUser) {
        set({ user: newUser })
      }
    }),
    {
      name: 'user-storage', // key in localStorage
      partialize: (state) => ({ user: state.user }) // only persist `user`
    }
  )
)
