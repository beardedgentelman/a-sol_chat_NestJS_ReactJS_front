import { createSlice } from '@reduxjs/toolkit'
import { toIndexDB } from 'helpers/toIndexDB'
import { IMessageState } from 'types/types'

const initialState: IMessageState = {
  text: '',
  user: null,
  date: ''
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state = action.payload
      toIndexDB(state)
      console.log(state)
    }
  }
})

export const { setMessage } = messageSlice.actions
export default messageSlice.reducer
