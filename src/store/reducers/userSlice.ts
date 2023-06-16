import { createSlice } from '@reduxjs/toolkit'
import { IUser } from 'types/types'

const initialState: IUser = {
  username: '',
  email: '',
  userAvatar: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
