import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "notif.",
  reducers: {
    changeNotification(state, action) {
      state = action.payload;
    },
  },
});

export const { changeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
