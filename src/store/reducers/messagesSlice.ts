import { createSlice } from '@reduxjs/toolkit'
import { IMessageState } from 'types/types'

const initialState: IMessageState = {
  text: null,
  user: null,
  date: null
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state = action.payload
    }
  }
})

export const { setMessage } = messageSlice.actions
export default messageSlice.reducer
