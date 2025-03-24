import AdminPage from "../pages/AdminPage";
import PageNotFound from "../pages/PageNotFound";
import UserPage from "../pages/UserPage";
import DetailRoomPage from "../pages/UserPage/DetailRoomPage";
import HomePage from "../pages/UserPage/HomePage";
import ListRoomPage from "../pages/UserPage/ListRoomPage";
import ProFilePage from "../pages/UserPage/ProfilePage";
import SignInPage from "../pages/UserPage/SignInPage";
import SignUpPage from "../pages/UserPage/SignUpPage";
import { TRoute } from "./routeType";

const routes: TRoute[] = [
  {
    path: "/",
    element: UserPage,
    children: [
      {
        path: "/",
        element: HomePage,
      },
      {
        path: "/list-room/:city",
        element: ListRoomPage,
      },
      {
        path: "/detail-room/:id",
        element: DetailRoomPage,
      },
      {
        path: "/profile",
        element: ProFilePage,
      },
    ],
  },
  {
    path: "/admin",
    element: AdminPage,
  },
  {
    path: "*",
    element: PageNotFound,
  },
  {
    path: "/sign-up",
    element: SignUpPage,
  },
  {
    path: "/sign-in",
    element: SignInPage,
  },
];

export default routes;
