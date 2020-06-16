import { toast } from './notifications'

export const setToken = token => {
  window.localStorage.setItem('token', token)
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const logOut = () => {
  toast('Goodbye!')
  localStorage.removeItem('token')
}

const payloadCheck = () => {
  const token = getToken()
  if (!token) return false
  const parts = token.split('.')
  if (parts.length < 3) return false
  return JSON.parse(window.atob([parts[1]]))
} 

export const isUser = id => {
  const user = payloadCheck().sub
  return user === id
}

export const isLoggedOn = () => {
  const payload = payloadCheck()
  if (!payload) return false
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp
}

