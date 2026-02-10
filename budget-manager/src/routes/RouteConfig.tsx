import InitialPage from "../pages/initial"
import Dashboard from "../pages/Dashboard"
import Transactions from "../pages/Transactions"
import Settings from "../pages/Settings"
import Analytics from "../pages/Analytics"
import Budgets from "../pages/Budgets"


export const ROUTES = {
    Home: '/',
    Dashboard: '/dashboard',
    Transactions: '/transactions',
    Settings: '/settings',
    Analytics:'/analytics',
    Budgets:'/budgets'
}

export const  routeConfig = [
    {path:ROUTES.Home, element: <InitialPage/>},
    {path:ROUTES.Dashboard, element: <Dashboard/>},
    {path:ROUTES.Transactions, element: <Transactions/>},
    {path:ROUTES.Settings, element: <Settings/>},
    {path:ROUTES.Analytics, element: <Analytics/>},
    {path:ROUTES.Budgets, element: <Budgets/>},
]