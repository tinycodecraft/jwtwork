import React, {
  createContext,
  useCallback,
  useState,
  
  type SetStateAction,
  useRef,
  useEffect,
} from 'react'

interface OpenMenuContextProps {
  ref?: React.MutableRefObject<HTMLAnchorElement | null>
  OpenMenu?: (value: SetStateAction<boolean>) => void
  MenuOpened: boolean
  sideAction: string
}

const OpenMenuContext = createContext<OpenMenuContextProps>({
  MenuOpened: false,
  sideAction: '',
  
})

export const OpenMenuProvider = ({
  children,
  eventlist,
  sideAction,
}: { children: React.ReactNode } & { eventlist: string[]; sideAction: string }) => {
  const [MenuOpened, OpenMenu] = useState<boolean>(false)
  const ref = useRef<HTMLAnchorElement | null>(null)  

  const triggerHandler = useCallback((e: Event) => {
    
    if (sideAction == 'lostFocus' && !ref.current?.contains(e.target as Node)) {
      

      MenuOpened && OpenMenu(false)
    }
  }, [ref,MenuOpened])
  useEffect(() => {
    eventlist.forEach((e) => document.addEventListener(e, triggerHandler))

    return () => {
      eventlist.forEach((e) => document.removeEventListener(e, triggerHandler))
    }
  }, [triggerHandler, ref])

  return (
    <OpenMenuContext.Provider
      value={{
        ref,
        OpenMenu,
        MenuOpened,
        sideAction,        
      }}
    >
      {children}
    </OpenMenuContext.Provider>
  )
}

export default OpenMenuContext