import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "./slices/Auth/sign-in";
import SignUpReducer from "./slices/Auth/sign-up";
import bookedRoomsReducer from "./slices/bookedRooms";
import locationReducer from "./slices/locations";
import roomReducer from "./slices/room";
import roomsReducer from "./slices/rooms";
import userReducer from "./slices/user";
// const env = import.meta.env.NODE_ENV;

const store = configureStore({
  reducer: {
    signIn: SignInReducer,
    signUp: SignUpReducer,
    location: locationReducer,
    rooms: roomsReducer,
    bookedRooms: bookedRoomsReducer,
    user: userReducer,
    room: roomReducer,
  },
  //   devTools: env === "development",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
