import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiPath, apiRoutes } from '../routes/routes.js'

export const authApi = createApi({
  reducerPath: 'authApi',
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
    login: builder.mutation({
      query: user => ({
        url: apiRoutes.loginPath(),
        method: 'POST',
        body: user,
      }),
    }),
    signup: builder.mutation({
      query: user => ({
        url: apiRoutes.signupPath(),
        method: 'POST',
        body: user,
      }),
    }),
  }),
})

const {
  useLoginMutation,
  useSignupMutation,
} = authApi

export {
  useLoginMutation as useLogin,
  useSignupMutation as useSignup,
}
