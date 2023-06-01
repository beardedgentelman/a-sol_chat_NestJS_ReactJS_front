import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const registrationPost = createAsyncThunk('auth/registration', async (_, thunkAPI) => {
  const responce = await axios.post('http://localhost:8080/auth/registration')
  return responce.data
})
