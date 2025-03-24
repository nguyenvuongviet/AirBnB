import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "./slices/sign-in";
// const env = import.meta.env.NODE_ENV;

const store = configureStore({
  reducer: {
    signIn: SignInReducer, 
  },
  //   devTools: env === "development",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
