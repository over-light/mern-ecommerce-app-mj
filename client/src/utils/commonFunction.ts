import jwt_decode from 'jwt-decode'

export const getErrorMessage = (error: any) => {
    return error?.response?.data?.message;
}

export const setCookie = (name: string, value: string, expiry: any) => {
  const expiryDate = new Date(expiry * 1000)
  document.cookie = `${name}=${value}; max-age=${expiryDate};`
}

export const decodeToken = (token: string) => {
  return jwt_decode(token)
}