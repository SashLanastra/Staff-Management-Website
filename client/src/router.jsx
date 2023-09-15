import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "./Layouts/AuthLayout";
import { Login } from "./pages/Login";
import { MainLayout } from "./Layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import { StaffManagement } from "./pages/StaffManagement";
import { Claims } from "./pages/Employee/Claims";
import { Birthdays } from "./pages/Birthdays";
import { StaffDetails } from "./pages/StaffDetails";
import { EmpHome } from "./pages/Employee/EmpHome";
import { EmpMainLayout } from "./Layouts/EmpMainLayout";
import { EmpClaims } from "./pages/EmpClaims";
import { ClaimsDetail } from "./pages/ClaimsDetail";



export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {path: "login", element: <Login/>}
        ]
    },
    {
        element: <MainLayout />,
        children: [
            {path: "dashboard", element: <Dashboard/>},
            {path: "/", element: <StaffManagement/>},
            {path: "birthdays", element: <Birthdays/>},
            {path: "employeeclaims", element: <EmpClaims/>},
            {path: "staffdetails/:id", element: <StaffDetails/>},
            {path: "claimsdetails/:id", element: <ClaimsDetail/>}
        ]
    },
    {
        element: <EmpMainLayout/>,
        children: [
            {path: "employeehome/:id", element: <EmpHome/>},
            {path: "claims/:id", element: <Claims/>},
        ]
    }
])