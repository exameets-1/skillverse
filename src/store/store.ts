import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "@/store/slices/chatSlice";
import studentRegistrationReducer from "@/store/slices/studentRegistrationSlice";
import beforeTestReducer from '@/store/slices/beforeTestSlice';
import testTakingReducer from '@/store/slices/testTakingSlice';
import authReducer from "@/store/slices/authSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    studentRegistration: studentRegistrationReducer,
    beforeTest: beforeTestReducer,
    testTaking: testTakingReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
