import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

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
    removeMessage: messagesAdapter.removeOne,
  }
});

export const { addMessage, addMessages, removeMessage } = messagesSlice.actions;
export default messagesSlice.reducer;