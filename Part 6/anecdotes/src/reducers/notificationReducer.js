import { createSlice } from "@reduxjs/toolkit"

const initialState = 'No error to show just yet'

const notificationSlice = createSlice({
  name: 'notification', 
  initialState, 
  reducers: {

  }
})

// export const { } = notificationSlice.actions;
export default notificationSlice.reducer;