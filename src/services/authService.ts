import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setUser } from 'store/reducers/userSlice'

import { IAuthState, ILogin, IRegistration } from 'types/types'

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8088' }),
  endpoints: builder => ({
    registration: builder.mutation<IAuthState, IRegistration>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body: body
      }),
      transformResponse: (response: IAuthState) => response,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { token, user } = data
          localStorage.setItem('token', token)
          dispatch(setUser(user))
        } catch (error: any) {
          localStorage.clear()
        }
      }
    }),
    login: builder.mutation<IAuthState, ILogin>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body: body
      }),
      transformResponse: (response: IAuthState) => response,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { token, user } = data
          localStorage.setItem('token', token)
          dispatch(setUser(user))
        } catch (error: any) {
          localStorage.clear()
        }
      }
    })
  })
})

export const { useRegistrationMutation, useLoginMutation } = authAPI
