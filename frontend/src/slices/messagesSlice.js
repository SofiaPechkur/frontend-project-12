import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {removeChannel} from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
  entities: {}, // '1':{ id: '1', body: 'text message', channelId: '1', username: 'admin }
  ids: [],
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const channelRemovedId = action.payload;
      const toDelete = state.ids.filter((id) => state.entities[id].channelId === channelRemovedId);
      messagesAdapter.removeMany(state, toDelete);
    })
  },

});

export const { addMessage, addMessages, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;