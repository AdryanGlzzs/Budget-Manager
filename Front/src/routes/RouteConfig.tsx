import { lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoute";

const InitialPage = lazy(() => import("../pages/Initial"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Transactions = lazy(() => import("../pages/Transactions"));
const Settings = lazy(() => import("../pages/Settings"));
const Analytics = lazy(() => import("../pages/Analytics"));
const Budgets = lazy(() => import("../pages/Budgets"));
const SavingsGoals = lazy(() => import("../pages/SavingsGoals"));
const Pricing = lazy(() => import("../pages/Pricing"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const ROUTES = {
  Home: "/",
  Dashboard: "/dashboard",
  Transactions: "/transactions",
  Settings: "/settings",
  Analytics: "/analytics",
  Budgets: "/budgets",
  SavingsGoals: "/savings-goals",
  Pricing: "/pricing",
  Login: "/login",
  Register: "/signup",
  NotFound: "*",
};

export const routeConfig = [
  { path: ROUTES.Home, element: <InitialPage /> },
  { path: ROUTES.Dashboard, element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: ROUTES.Transactions, element: <ProtectedRoute><Transactions /></ProtectedRoute> },
  { path: ROUTES.Settings, element: <ProtectedRoute><Settings /></ProtectedRoute> },
  { path: ROUTES.Analytics, element: <ProtectedRoute><Analytics /></ProtectedRoute> },
  { path: ROUTES.Budgets, element: <ProtectedRoute><Budgets /></ProtectedRoute> },
  { path: ROUTES.SavingsGoals, element: <ProtectedRoute><SavingsGoals /></ProtectedRoute> },
  { path: ROUTES.Pricing, element: <Pricing /> },
  { path: ROUTES.Login, element: <LoginPage /> },
  { path: ROUTES.Register, element: <RegisterPage /> },
  { path: ROUTES.NotFound, element: <NotFound /> },
];

