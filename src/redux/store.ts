import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import newsSliceReducer from "./slices/newsSlice";

export const store = configureStore({
  reducer: {
    news: newsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

