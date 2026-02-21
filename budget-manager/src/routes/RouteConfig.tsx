import InitialPage from "../pages/Initial";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Settings from "../pages/Settings";
import Analytics from "../pages/Analytics";
import Budgets from "../pages/Budgets";
import SavingsGoals from "../pages/SavingsGoals";
import Pricing from "../pages/Pricing";
import LoginPage from "../pages/LoginPage";

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
];
