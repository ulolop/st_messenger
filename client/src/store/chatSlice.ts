import type { PayloadAction } from '@reduxjs/toolkit'
import { IChatMessage, IChatRoom, IChatSliceState } from '../types'
import { createAppSlice } from './createAppSlice'

const initialState: IChatSliceState = {
  room: {
    name: '',
    role: '',
    online: false,
  },
  messages: [],
}

export const chatSlice = createAppSlice({
  name: 'chat',
  initialState,
  reducers: create => ({
    updateRoom: create.reducer((state, action: PayloadAction<IChatRoom>) => {
      state.room = action.payload
    }),
    setMessages: create.reducer((state, action: PayloadAction<IChatMessage[]>) => {
      state.messages = action.payload
    }),
    sendMessage: create.reducer((state, action: PayloadAction<IChatMessage>) => {
      state.messages = [...state.messages, action.payload]
    }),
  }),
  selectors: {
    selectRoom: store => store.room,
    selectMessages: store => store.messages,
  },
})

export const { updateRoom, setMessages, sendMessage } = chatSlice.actions

export const { selectRoom, selectMessages } = chatSlice.selectors
