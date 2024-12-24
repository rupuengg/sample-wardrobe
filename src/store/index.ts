import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { wardrobeReducer } from "store";

export * from './slices';
export * from './states';

const rootReducer = combineReducers({
  wardrobe: wardrobeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENVIRONMENT === 'development',
});

export type IApplicationState = ReturnType<typeof store.getState>;
export type IUseDispatch = any;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();