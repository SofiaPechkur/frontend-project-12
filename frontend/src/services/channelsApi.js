import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiPath, apiRoutes } from '../routes/routes.js'

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
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
    getChannels: builder.query({
      query: () => apiRoutes.channelsPath(),
    }),
    sendNewChannel: builder.mutation({
      query: channel => ({
        url: apiRoutes.channelsPath(),
        method: 'POST',
        body: channel,
      }),
    }),
    sendUpdateChannel: builder.mutation({
      query: channel => ({
        url: apiRoutes.channelPath(channel.id),
        method: 'PATCH',
        body: channel,
      }),
    }),
    sendRemoveChannel: builder.mutation({
      query: id => ({
        url: apiRoutes.channelPath(id),
        method: 'DELETE',
      }),
    }),
  }),
})

const {
  useGetChannelsQuery,
  useSendNewChannelMutation,
  useSendUpdateChannelMutation,
  useSendRemoveChannelMutation,
} = channelsApi

export {
  useGetChannelsQuery as useGetChannels,
  useSendNewChannelMutation as useSendNewChannel,
  useSendUpdateChannelMutation as useSendUpdateChannel,
  useSendRemoveChannelMutation as useSendRemoveChannel,
}
