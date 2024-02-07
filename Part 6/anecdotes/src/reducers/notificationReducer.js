import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification', 
  initialState, 
  reducers: {
    newNotification: (state, action) => {
      return action.payload
    }
  }
})

export const createNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(newNotification(message))
    setTimeout(() => dispatch(newNotification('')), seconds * 1000)
  }
}

export const { newNotification } = notificationSlice.actions;
export default notificationSlice.reducer;