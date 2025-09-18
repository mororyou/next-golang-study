'use client'

import { useEffect } from 'react'
import { CSRFToken } from '../../schemas'

// CSRF Tokenをグローバルに保存するための変数
let csrfToken: string | null = null

export const getCsrfToken = () => csrfToken

export const setCsrfToken = (token: string) => {
  csrfToken = token
}

const fetchCsrfToken = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/csrf`, {
      method: 'GET',
      credentials: 'include', // withCredentials: true と同等
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: CSRFToken = await response.json()
    setCsrfToken(data.csrf_token)
  } catch (error) {
    console.error('CSRF Token取得エラー:', error)
    throw error
  }
}

export default function CSRFTokenProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    fetchCsrfToken()
  }, [])
  return <>{children}</>
}
