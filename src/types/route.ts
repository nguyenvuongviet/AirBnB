import { LazyExoticComponent, JSX } from "react";

export type TRoute = {
  path: string;
  element: LazyExoticComponent<() => JSX.Element>;
  children?: TRoute[];
};
