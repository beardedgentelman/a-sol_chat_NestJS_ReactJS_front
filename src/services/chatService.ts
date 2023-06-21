import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IChat } from 'types/types'

interface IChatName {
  name: string
}

export const chatAPI = createApi({
  reducerPath: 'chatAPI',
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
    createChat: builder.mutation<IChat, IChatName>({
      query: body => {
        return {
          url: '/chats/create-chat',
          method: 'POST',
          body: body
        }
      },
      transformResponse: (response: IChat) => response,
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const chat = data as IChat
        } catch (error: any) {
          console.log(error)
        }
      }
    })
  })
})

export const { useCreateChatMutation } = chatAPI
