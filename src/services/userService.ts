import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setUser } from 'store/reducers/userSlice'
import { IUser } from 'types/types'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8088',
    prepareHeaders: headers => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: builder => ({
    getMe: builder.mutation<IUser, void>({
      query: () => '/users/get-me',
      transformResponse: (response: IUser) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const user = data as IUser
          dispatch(setUser(user))
        } catch (error: any) {}
      }
    })
  })
})

export const { useGetMeMutation } = userAPI
