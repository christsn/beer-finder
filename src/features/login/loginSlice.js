import { createSlice } from '@reduxjs/toolkit'

const storedUsername = localStorage.getItem('username') || ''

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: storedUsername,
    loading: false,
    hasErrors: false
  },
  reducers: {
    loginRequest: state => {
      state.loading = true
    },
    loginSuccess: (state, { payload }) => {
      state.username = payload
      state.loading = false
      state.hasErrors = false
    },
    loginFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
    logoutSuccess: state => {
      state.username = ''
    }
  }
})

export const { loginRequest, loginSuccess, loginFailure, logoutSuccess } = loginSlice.actions

function login(username) {
  return async dispatch => {
    dispatch(loginRequest())

    try {
      const response = await fetch('https://yesno.wtf/api')
      const data = await response.json()

      if (data.answer === 'yes') {
        localStorage.setItem('username', username)
        dispatch(loginSuccess(username))
      } else {
        dispatch(loginFailure())
      }
    } catch (error) {
      dispatch(loginFailure())
    }
  }
}

function logout() {
  return async dispatch => {
    dispatch(logoutSuccess())
    localStorage.removeItem('username')
  }
}

export const loginActions = {
  login,
  logout,
}

export const loginReducer = loginSlice.reducer
