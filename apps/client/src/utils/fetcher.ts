import { getCsrfToken } from '../provider/CSRFTokenProvider'

// CSRF Tokenを含んだfetchのヘルパー関数
export const fetchWithCsrf = async (url: string, options: RequestInit = {}) => {
  const token = getCsrfToken()

  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'X-CSRF-Token': token }),
      ...options.headers,
    },
  })
}
