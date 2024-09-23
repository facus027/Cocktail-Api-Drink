import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./view/IndexPage";
import Layouts from "./layouts/Layouts";

const FavoritPage = lazy(() => import("./view/FavoritPage"));
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layouts />}>
          <Route path="/" element={<IndexPage />} index></Route>
          <Route
            path="/favoritos"
            element={
              <Suspense fallback="...Cargando">
                <FavoritPage />
              </Suspense>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
