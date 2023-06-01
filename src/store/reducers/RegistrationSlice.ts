import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRegistration } from 'types/types'

interface RegistrationState {
  form: IRegistration
  isLoading: boolean
  error: string
}

const initialState: RegistrationState = {
  form: {
    username: '',
    email: '',
    password: ''
  },
  isLoading: false,
  error: '',
  
}

export const RegistrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers {
    postRegistration()
  },
    postRegistration(state, action: PayloadAction<IRegistration>) {
      state.isLoading = true
    },
    postRegistrationSuccess(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = ''
      state.token = action.payload
    },
    postRegistrationError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    }
  }
})

export default RegistrationSlice.reducer
