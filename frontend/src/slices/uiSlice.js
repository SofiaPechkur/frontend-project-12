import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedChannelId: '1',
    typeModal: null,
    processedChannel: null,
  },
  reducers: {
    showModal(state, action) {
      const { type, channel } = action.payload
      state.typeModal = type
      state.processedChannel = channel
    },
    hideModal(state) {
      state.typeModal = null
      state.processedChannel = null
    },
    selectChannel(state, action) {
      state.selectedChannelId = action.payload
    },
  },
})

export const { showModal, hideModal, selectChannel } = uiSlice.actions
export default uiSlice.reducer
