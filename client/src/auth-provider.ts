const prefix = '__token__'

export const setToken = (token: string) => {
  return window.localStorage.setItem(prefix, token)
}

export const getToken = () => {
  return window.localStorage.getItem(prefix)
}

export const removeToken = () => {
  return window.localStorage.removeItem(prefix)
}