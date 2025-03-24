import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "./slices/sign-in";
import SignUpReducer from "./slices/sign-up";
// const env = import.meta.env.NODE_ENV;

const store = configureStore({
  reducer: {
    signIn: SignInReducer,
    signUp: SignUpReducer,
  },
  //   devTools: env === "development",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
