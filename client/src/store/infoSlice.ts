import type { PayloadAction } from '@reduxjs/toolkit'
import { IChatMessage, IUserInfo, IInfoSliceState } from '../types'
import { createAppSlice } from './createAppSlice'

const initialState: IInfoSliceState = {
  userInfo: null,
  notifications: [],
}

export const infoSlice = createAppSlice({
  name: 'info',
  initialState,
  reducers: create => ({
    setUserInfo: create.reducer((state, action: PayloadAction<IUserInfo>) => {
      state.userInfo = action.payload
    }),
    clearUserInfo: create.reducer(state => {
      state.userInfo = null
    }),
    addNotification: create.reducer((state, action: PayloadAction<IChatMessage>) => {
      state.notifications = [...state.notifications.slice(-2), action.payload]
    }),
    removeNotification: create.reducer((state, action: PayloadAction<number>) => {
      state.notifications.splice(action.payload, 1)
    }),
    clearNotifications: create.reducer(state => {
      state.notifications = []
    }),
  }),
  selectors: {
    selectUserInfo: store => store.userInfo,
    selectNotifications: store => store.notifications,
  },
})

// Action creators are generated for each case reducer function.
export const { setUserInfo, clearUserInfo, addNotification, removeNotification, clearNotifications } = infoSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUserInfo, selectNotifications } = infoSlice.selectors
