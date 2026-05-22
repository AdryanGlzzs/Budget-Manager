import { lazy } from "react";

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
  
};

export const routeConfig = [
  { path: ROUTES.Home, element: <InitialPage /> },
  { path: ROUTES.Dashboard, element: <Dashboard /> },
  { path: ROUTES.Transactions, element: <Transactions /> },
  { path: ROUTES.Settings, element: <Settings /> },
  { path: ROUTES.Analytics, element: <Analytics /> },
  { path: ROUTES.Budgets, element: <Budgets /> },
  { path: ROUTES.SavingsGoals, element: <SavingsGoals /> },
  { path: ROUTES.Pricing, element: <Pricing /> },
  { path: ROUTES.Login, element: <LoginPage /> },
  { path: ROUTES.Register, element: <RegisterPage /> },
];
