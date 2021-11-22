import React, { useEffect } from 'react'
import { parseJwt } from '../Api'
import useLocalStorage from './useLocalStorage'
export const TokenContext = React.createContext('')

export default function TokenProvider (props) {
  const [Token, setToken] = useLocalStorage('Token', '')

  useEffect(() => {
    if (typeof Token === 'string' && Token.length > 0) {
      const info = parseJwt(Token)
      console.log(info)
    }
  }, [Token, setToken])

  return (
    <TokenContext.Provider value={[Token, setToken]}>
      {props.children}
    </TokenContext.Provider>
  )
}
