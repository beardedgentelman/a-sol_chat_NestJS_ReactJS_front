import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { authAPI } from 'services/authService'

import messageReducer from './reducers/messagesSlice'
import userReducer from './reducers/userSlice'

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  userReducer,
  messageReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
