import React, { useContext, type FunctionComponent, useCallback, type FormEvent, useRef } from 'react'

import { Authenticator } from 'src/fragments'
import BasedGhostLogoPNG from 'src/assets/image/based-ghost-main.png'
import { useAppDispatch, useAppSelector } from 'src/store'
import { ApiStatusEnum, Routes } from 'src/config'
import { toast, type Id } from 'react-toastify'
import alerttoast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import LoginContext from 'src/context/LoginContext'
import { loginAsync, setAuthStatus, resetState,  setConnectionValue } from 'src/store/authSlice'
import { type Credentials } from 'src/fragments/types'
import { Button, Checkbox, Input, Typography } from '@material-tailwind/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SignalRApi } from 'src/api'

const LoginForm: FunctionComponent = () => {
  const toastIdRef = useRef<Id>('')
  const {
    userName,
    setUserName,
    password,
    setPassword,
    newPassword,
    setNewPassword,
    toggleShow,
    rememberMe,
    show,
    isInvalid,
    setInvalid,
    lastError,
    setLastError,
    setRememberMe,
  } = useContext(LoginContext)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const status = useAppSelector<ApiStatusEnum>((state) => state.auth.status)
  const error = useAppSelector<string | undefined>((state) => state.auth.error)

  const newShow = useAppSelector<boolean>((state) => state.auth.needNew)
  const dispatchAuthStatus = useCallback(
    (status: ApiStatusEnum): void => {
      dispatch(setAuthStatus(status))
    },
    [dispatch],
  )
  const onFailedAuth = useCallback(
    (error: any): void => {
      alerttoast.error(`login fails with ${error}`)
      setLastError && setLastError(error)
      dispatchAuthStatus(ApiStatusEnum.NONE)
      dispatch(resetState())
      setInvalid && setInvalid(true)
    },
    [dispatch, dispatchAuthStatus],
  )
  const onSuccessfulAuth = useCallback((): void => {
    if (SignalRApi.connectionId) {
      dispatch(setConnectionValue(SignalRApi.connectionId))
    }

    const homePath = Routes.find((x) => x.name === 'Home')?.path ?? '/'
    navigate(homePath)
  }, [navigate, dispatch])

  const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (status === ApiStatusEnum.PROCESS) {
      return
    }

    if (!userName || !password || (newShow && !newPassword)) {
      // Run invalidInputs error and display toast notification (if one is not already active)
      setInvalid && setInvalid(true)
      if (!toast.isActive(toastIdRef.current)) {
        const plusnew = newShow ? ' and new password' : ''

        toastIdRef.current = toast.error(`Enter user name/password${plusnew}`)
      }
    } else {
      // Clear any toast notifications and prepare state for Login request stub / run login request stub
      toast.dismiss()
      setInvalid && setInvalid(false)
      dispatchAuthStatus(ApiStatusEnum.PROCESS)

      setTimeout(() => {
        const credentials: Credentials = {
          rememberMe,
          userName: userName,
          password: password,
          newPassword: newPassword,
        }

        dispatch(loginAsync(credentials))
      }, 2000)
    }
  }

  return (
    <section className='section section-login'>
      <div className='container has-text-centered'>
        <div className='column is-4 is-offset-4'>
          <h3 className='title font-fira'>Login</h3>
          <p className='subtitle'>Please login to proceed</p>
          <div className='box login-box'>
            <img className='block ml-[auto] mr-[auto]' width='170' aria-hidden id='login-img' alt='based-ghost-logo' src={BasedGhostLogoPNG} />
            <form onSubmit={handleLogin}>
              <div className='form-login'>
                {lastError && (
                  <Typography variant='small' color='red' className='!text-left mb-0'>
                    {lastError}
                  </Typography>
                )}
                <Input
                  variant='outlined'
                  label='User Name'
                  type='text'
                  value={userName}
                  error={isInvalid}
                  onChange={(e) => setUserName && setUserName(e.target.value)}
                />
                <Input
                  variant='outlined'
                  label='Password'
                  type={show ? 'password' : 'text'}
                  value={password}
                  error={isInvalid}
                  onChange={(e) => setPassword && setPassword(e.target.value)}
                  icon={show ? <FontAwesomeIcon icon='eye' onClick={toggleShow} /> : <FontAwesomeIcon icon='eye-slash' onClick={toggleShow} />}
                />
                {newShow ? (
                  <Input
                    variant='outlined'
                    label='New Password'
                    type={show ? 'password' : 'text'}
                    value={newPassword}
                    error={isInvalid}
                    onChange={(e) => setNewPassword && setNewPassword(e.target.value)}
                    icon={show ? <FontAwesomeIcon icon='eye' onClick={toggleShow} /> : <FontAwesomeIcon icon='eye-slash' onClick={toggleShow} />}
                  />
                ) : (
                  <></>
                )}
                <Checkbox label='Remember Me' checked={rememberMe} ripple={false} onChange={() => setRememberMe && setRememberMe(!rememberMe)} />
                <Typography color='gray' className='mt-4 text-center font-normal self-center w-full'>
                  <Button type='submit' color='green' className='items-center gap-3 w-full inline-block' size='lg'>
                    <span>
                      Login
                      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='pl-2 inline w-8 h-6'>
                        <path
                          fillRule='evenodd'
                          d='M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75zM6.157 5.739a.75.75 0 01.21 1.04A6.715 6.715 0 005.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 01-1.27-.8A6.715 6.715 0 003.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 011.04-.211zM12 7.5a3 3 0 00-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 11-1.112-1.008A10.459 10.459 0 007.5 10.5a4.5 4.5 0 119 0c0 .547-.022 1.09-.067 1.626a.75.75 0 01-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 00-3-3zm0 2.25a.75.75 0 01.75.75A15.69 15.69 0 018.97 20.738a.75.75 0 01-1.14-.975A14.19 14.19 0 0011.25 10.5a.75.75 0 01.75-.75zm3.239 5.183a.75.75 0 01.515.927 19.415 19.415 0 01-2.585 5.544.75.75 0 11-1.243-.84 17.912 17.912 0 002.386-5.116.75.75 0 01.927-.515z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </span>
                  </Button>
                </Typography>
              </div>

              <Authenticator error={error} authStatus={status} handleOnFail={onFailedAuth} handleOnSuccess={onSuccessfulAuth} />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
LoginForm.displayName = 'LoginForm'

export default LoginForm
