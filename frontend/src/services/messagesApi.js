import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiPath, apiRoutes } from '../routes/routes.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPath,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => apiRoutes.messagesPath(),
    }),
    sendMessage: builder.mutation({
      query: message => ({
        url: apiRoutes.messagesPath(),
        method: 'POST',
        body: message,
      }),
    }),
  }),
})

const {
  useGetMessagesQuery,
  useSendMessageMutation,
} = messagesApi

export {
  useGetMessagesQuery as useGetMessages,
  useSendMessageMutation as useSendMessage,
}
