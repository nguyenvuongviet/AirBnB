import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import store from "./store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
