import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "@/store/slices/chatSlice";
import studentRegistrationReducer from "@/store/slices/studentRegistrationSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    studentRegistration: studentRegistrationReducer,
  },
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;