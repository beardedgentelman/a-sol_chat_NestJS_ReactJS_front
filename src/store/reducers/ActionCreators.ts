import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IRegistration } from 'types/types'

export const registrationPost = createAsyncThunk('auth/registration', async (body: IRegistration, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:8080/auth/registration', body)
    localStorage.setItem('token', response.data.token)
    return response.data.user
  } catch (error: any) {
    localStorage.clear()
    const errorMessage = error.response.data.message
    throw errorMessage
  }
})
