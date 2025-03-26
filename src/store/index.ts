import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "./slices/sign-in";
import SignUpReducer from "./slices/sign-up";
import locationReducer from "./slices/location";
// const env = import.meta.env.NODE_ENV;

const store = configureStore({
  reducer: {
    signIn: SignInReducer,
    signUp: SignUpReducer,
    location: locationReducer,
  },
  //   devTools: env === "development",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
