import {useCallback} from 'react'
import axios from 'axios'
import server from 'services/server'
import {applyToken, verifyToken} from 'utils/authentication'

import {useStore} from 'store'

const useAuthentication = () => {
  const {setLoading} = useStore()
  const token = `Token ${verifyToken()}`

  const login = useCallback(
    body => {
      setLoading(true)
      return axios
        .post(`${server}/login/`, body, {})
        .then(response => {
          applyToken(response.data.token)
          return response
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading]
  )

  const logout = useCallback(
    body => {
      setLoading(true)
      return axios
        .get(`${server}/logout/`, {
          headers: {
            Authorization: token,
          },
        })
        .then(response => {
          return response
        })
        .catch(error => {
          console.log('ERROR', error)
          return false
        })
        .finally(() => setLoading(false))
    },
    [setLoading]
  )

  const sendRecoverEmail = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(true)
        }, 1000)
      }),
    [setLoading]
  )

  const changePassword = useCallback(
    () =>
      new Promise(resolve => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          resolve(true)
        }, 1000)
      }),
    [setLoading]
  )

  return {
    login,
    logout,
    sendRecoverEmail,
    changePassword,
  }
}

export default useAuthentication

// MOCKS

// const login = useCallback(
//   () =>
//     new Promise(resolve => {
//       setLoading(true)
//       setTimeout(() => {
//         setLoading(false)
//         resolve(true)
//       }, 1000)
//     }),
//   [setLoading]
// )
