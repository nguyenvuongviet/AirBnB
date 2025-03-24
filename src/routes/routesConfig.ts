import { lazy } from "react";
import { TRoute } from "./routeType";

const routes: TRoute[] = [
  {
    path: "/",
    element: lazy(() => import("../pages/UserPage")),
    children: [
      {
        path: "/",
        element: lazy(() => import("../pages/UserPage/HomePage")),
      },
      {
        path: "/list-room/:city",
        element: lazy(() => import("../pages/UserPage/ListRoomPage")),
      },
      {
        path: "/detail-room/:id",
        element: lazy(() => import("../pages/UserPage/DetailRoomPage")),
      },
      {
        path: "/profile",
        element: lazy(() => import("../pages/UserPage/ProfilePage")),
      },
    ],
  },
  {
    path: "/admin",
    element: lazy(() => import("../pages/AdminPage")),
  },
  {
    path: "*",
    element: lazy(() => import("../pages/PageNotFound")),
  },
  {
    path: "/sign-up",
    element: lazy(() => import("../pages/UserPage/SignUpPage")),
  },
  {
    path: "/sign-in",
    element: lazy(() => import("../pages/UserPage/SignInPage")),
  },
];

export default routes;
