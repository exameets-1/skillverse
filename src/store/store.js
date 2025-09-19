import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "@/store/slices/chatSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
