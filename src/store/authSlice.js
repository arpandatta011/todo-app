import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('user') 
    },
    initializeAuth: (state) => {
      try {
        const user = localStorage.getItem('user')
        if (user) {
          state.isAuthenticated = true
          state.user = JSON.parse(user)
        }
      } catch (error) {
        console.error('Error reading auth data from localStorage', error)
        localStorage.removeItem('user')
      }
    },
  },
})

export const { login, logout, initializeAuth } = authSlice.actions
export default authSlice.reducer
