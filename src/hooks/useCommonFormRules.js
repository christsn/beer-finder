import { useCallback } from 'react'

export function useCommonFormRules() {
  const required = useCallback(
    (message, other) => ({
    ...other,
    required: true,
    message: message || 'A mező megadása kötelező'
    }),
    []
  )

  const requiredString = useCallback(
    (message, other) => ({
    ...other,
    required: true,
    whitespace: true,
    message: message || 'A mező megadása kötelező'
    }),
    []
  )

  const email = useCallback(
    (message) => ({
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: message || 'Hibás email formátum'
    }),
    []
  )

  return {
    required,
    requiredString,
    email
  }
}