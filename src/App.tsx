import { BrowserRouter, Routes } from "react-router-dom";
import renderRoutes from "./routes";
import { Suspense } from "react";
import Loading from "./components/Loading";
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
