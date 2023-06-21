import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IChat } from 'types/types'

export const chatAPI = createApi({
  reducerPath: 'chatAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8088'
  }),
  endpoints: builder => ({
    createChat: builder.mutation<IChat, number>({
      query: body => ({
        url: '/chats/create-chat',
        method: 'POST',
        body: body
      }),
      transformResponse: (response: IChat) => response,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const chat = data as IChat
          console.log(chat)
        } catch (error: any) {
          console.log(error)
        }
      }
    })
  })
})

export const { useCreateChatMutation } = chatAPI
