import { createSlice } from '@reduxjs/toolkit'
import { IMessage } from 'types/types'

const initialState: IMessage = {
  userId: null,
  chatId: null,
  text: null,
  date: null
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return action.payload
    }
  }
})

export const { setMessage } = messageSlice.actions
export default messageSlice.reducer
