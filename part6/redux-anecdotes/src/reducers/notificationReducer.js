import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotificationText(state, action) {
      return action.payload;
    },
    resetNotification(state, action) {
      return "";
    },
  },
});

export const setNotification = (text, miliSeconds) => {
  return (dispatch) => {
    dispatch(setNotificationText(text));
    setTimeout(() => {
      dispatch(resetNotification());
    }, miliSeconds * 1000);
  };
};

export const { setNotificationText, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
