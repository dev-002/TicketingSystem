import { configureStore } from "@reduxjs/toolkit";
import { alertslice } from "./features/alertSlice";
import { userSlice } from "./features/userSlice";

export default configureStore({
  reducer: {
    alerts: alertslice.reducer,
    user: userSlice.reducer,
  },
});
