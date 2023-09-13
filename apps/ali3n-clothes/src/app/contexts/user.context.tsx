import {
  createContext, useState, useEffect, useMemo, Dispatch, SetStateAction
} from 'react'
import type { User } from 'firebase/auth'

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils'

type UserProviderProps = {
  children: React.ReactNode;
}

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<null>>
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => ({})
})

export function UserProvider({ children }: UserProviderProps) {
  const [currentUser, setCurrentUser] = useState(null)
  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser])

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user, {})
      }
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
