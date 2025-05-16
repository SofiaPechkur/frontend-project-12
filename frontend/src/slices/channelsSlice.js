import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  selectedChannelId: '1',
  entities: {},
  ids: [],
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    updateChannel: channelsAdapter.updateOne,
    removeChannel: channelsAdapter.removeOne,
    selectChannel: (state, action) => {
      state.selectedChannelId = action.payload;
    }
  }
});

export const { addChannel, addChannels, updateChannel, removeChannel, selectChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
