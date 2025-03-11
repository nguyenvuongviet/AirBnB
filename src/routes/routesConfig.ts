import { lazy } from "react";
import { TRoute } from "../types/route";

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
];

export default routes;
