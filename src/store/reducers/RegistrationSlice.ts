import { createSlice } from '@reduxjs/toolkit'
import { IAuthState } from 'types/types'

import { registrationPost } from './ActionCreators'

interface RegistrationState {
  authState: IAuthState
  isLoading: boolean
  error: any
}

const initialState: RegistrationState = {
  authState: {
    user: null
  },
  isLoading: false,
  error: ''
}

export const RegistrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registrationPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = ''
        state.authState = {
          user: action.payload
        }
      })
      .addCase(registrationPost.pending, state => {
        state.isLoading = true
      })
      .addCase(registrationPost.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
        state.authState = initialState.authState
      })
  }
})

export default RegistrationSlice.reducer
