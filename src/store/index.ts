import { configureStore } from "@reduxjs/toolkit";

// const env = import.meta.env.NODE_ENV;

const store = configureStore({
  reducer: {},
//   devTools: env === "development",
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
