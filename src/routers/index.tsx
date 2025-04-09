import { Route } from "react-router-dom";
import routes from "./routesConfig";

const renderRoutes = () => {
  return routes.map((item) => (
    <Route key={item.path} path={item.path} element={<item.element />}>
      {item.children &&
        item.children.map((child) => (
          <Route
            key={child.path}
            path={child.path}
            element={<child.element />}
          />
        ))}
    </Route>
  ));
};

export default renderRoutes;
