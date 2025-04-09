export type TRoute = {
  path: string;
  element: React.FC;
  children?: TRoute[];
};
