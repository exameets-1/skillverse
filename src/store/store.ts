import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "@/store/slices/chatSlice";
import studentRegistrationReducer from "@/store/slices/studentRegistrationSlice";
import beforeTestReducer from '@/store/slices/beforeTestSlice';
import testTakingReducer from '@/store/slices/testTakingSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    studentRegistration: studentRegistrationReducer,
    beforeTest: beforeTestReducer,
    testTaking: testTakingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;