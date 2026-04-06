import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routeConfig } from "./RouteConfig";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {routeConfig.map((route) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}
