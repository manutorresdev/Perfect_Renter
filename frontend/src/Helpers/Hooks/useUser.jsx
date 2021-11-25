import { useContext, useEffect, useState } from 'react'
import { get, parseJwt } from '../Api'
import { TokenContext } from './TokenProvider'

export default function useUser () {
  const [token] = useContext(TokenContext)
  const [User, setUser] = useState({})

  useEffect(() => {
    // const controller = new AbortController();
    if (token) {
      get(
        `https://api.reservalo.online/users/${parseJwt(token).idUser}`,
        (data) => {
          if (data.message !== 'No hay conicidencias para su busqueda') {
            setUser(data.userInfo)
          } else {
            setUser({})
          }
        },
        (error) => console.error(error),
        token,
        null
      )
    }
    return () => {
      // controller.abort();
    }
  }, [token])

  return [User, setUser]
}
