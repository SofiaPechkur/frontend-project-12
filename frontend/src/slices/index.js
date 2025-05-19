import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import channelsReducer from './channelsSlice.js'
import messagesReducer from './messagesSlice.js'
import modalReducer from './modalSlice.js'
import { authApi } from '../services/authApi.js'
import { channelsApi } from '../services/channelsApi.js'
import { mesagesApi } from '../services/mesagesApi.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [mesagesApi.reducerPath]: mesagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelsApi.middleware)
      .concat(mesagesApi.middleware),
})

export default store
