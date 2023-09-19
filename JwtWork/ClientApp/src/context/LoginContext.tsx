import React, { createContext, useCallback, useState, type SetStateAction, useRef, useEffect } from 'react'
import { useTextInput } from 'src/hooks'

interface LoginContextProps {
  userName: string
  setUserName: (value: SetStateAction<string>) => void
  password: string
  setPassword: (value: SetStateAction<string>) => void
  newPassword: string
  setNewPassword: (value: SetStateAction<string>) => void
  toggleShow: () => void
  show: boolean
  setShow: (value: SetStateAction<boolean>) => void
  isInvalid: boolean
  setInvalid: (value: SetStateAction<boolean>) => void
  lastError:string;
  setLastError: (value:SetStateAction<string>) => void

  rememberMe: boolean
  setRememberMe: (value: SetStateAction<boolean>) => void
}

const LoginContext = createContext<Partial<LoginContextProps>>({ show: false, isInvalid: false })

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [show, setShow] = useState<boolean>(true)
  const [isInvalid, setInvalid] = useState<boolean>(false)
  const [lastError, setLastError] = useState<string>('')
  const [rememberMe, setRememberMe] = useState<boolean>(false)

  const switchShow = useCallback((): void => {
    setShow(!show)
  }, [show, setShow])

  return (
    <LoginContext.Provider
      value={{
        userName,
        setUserName,
        password,
        setPassword,
        newPassword,
        setNewPassword,
        show,
        setShow,
        lastError,
        setLastError,
        isInvalid,
        setInvalid,
        toggleShow: switchShow,
        rememberMe,
        setRememberMe,
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export default LoginContext
