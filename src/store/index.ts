import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/locations";
import roomsReducer from "./slices/rooms";
import SignInReducer from "./slices/sign-in";
import SignUpReducer from "./slices/sign-up";
// const env = import.meta.env.NODE_ENV;

const store = configureStore({
  reducer: {
    signIn: SignInReducer,
    signUp: SignUpReducer,
    location: locationReducer,
    rooms: roomsReducer,
  },
  //   devTools: env === "development",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
