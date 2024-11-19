import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { wardrobeReducer } from "store/slices";

const store = configureStore({
  reducer: {
    wardrobe: wardrobeReducer,
  },
  devTools: process.env.REACT_APP_ENVIRONMENT === 'development',
});

export type IApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();

export default store;