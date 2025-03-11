import React, { JSX, lazy } from "react";
import { Route } from "react-router-dom";

type TRoute = {
  path: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
  children?: TRoute[];
};

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
    children: [],
  },
  {
    path: "*",
    element: lazy(() => import("../pages/PageNotFound")),
  },
];

const renderRoutes = () => {
  return routes.map((item) => {
    if (item.children) {
      return (
        <Route key={item.path} path={item.path} element={<item.element />}>
          {item.children.map((child) => {
            return (
              <Route
                key={child.path}
                path={child.path}
                element={<child.element />}
              />
            );
          })}
        </Route>
      );
    }
    return (
      <Route key={item.path} path={item.path} element={<item.element />} />
    );
  });
};

export default renderRoutes;
