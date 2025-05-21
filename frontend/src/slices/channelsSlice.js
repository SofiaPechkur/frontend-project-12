import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { channelsApi } from '../services/channelsApi.js'

const channelsAdapter = createEntityAdapter()

const initialState = channelsAdapter.getInitialState({
  entities: {}, // "2":{"id":"2","name":"random","removable":false}
  ids: [],
})

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        channelsApi.endpoints.getChannels.matchFulfilled,
        (state, action) => {
          channelsAdapter.upsertMany(state, action.payload)
        },
      )
  },
})

export const {
  addChannel, addChannels, updateChannel, removeChannel,
} = channelsSlice.actions
export default channelsSlice.reducer
