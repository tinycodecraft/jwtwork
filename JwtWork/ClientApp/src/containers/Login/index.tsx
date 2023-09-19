import React, { type FunctionComponent } from 'react'
import { LoginProvider } from 'src/context/LoginContext'
import LoginForm from './LoginForm'



export const DefaultLogin:FunctionComponent = () => {
  return (
    <LoginProvider>
        <LoginForm></LoginForm>
    </LoginProvider>
  )
}

export default DefaultLogin