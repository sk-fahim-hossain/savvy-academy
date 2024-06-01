import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import AllClassesPage from "../Pages/AllClassesPage/AllClassesPage";
import AllInstructorPage from "../Pages/AllInstructorPage/AllInstructorPage";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Secret/Secret";
import ManageUsers from "../Pages/AdminDashboard/ManageUsers/ManageUsers";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import Dashboard from "../Pages/Dashboard/Dashboard";
import StudentDashboard from "../Pages/StudentDashboard/StudentDashboard";
import MyClasses from "../Pages/StudentDashboard/MyClasses/MyClasses";
import MyEnrolledClasses from "../Pages/StudentDashboard/MyEnrolledClasses/MyEnrolledClasses";
import PaymentHistory from "../Pages/StudentDashboard/PymentHistory/PaymentHistory";
import ManageClasses from "../Pages/AdminDashboard/ManageClasses/ManageClasses";
import InstructorDashboard from "../Pages/InstuctorDashboard/InstructorDashboard";
import AddClasses from "../Pages/InstuctorDashboard/AddClasses/AddClasses";
import InstructorCLasses from "../Pages/InstuctorDashboard/InstructorClasses/InstructorCLasses";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: "/all-classes",
                element: <AllClassesPage></AllClassesPage>
            },
            {
                path: "/all-instructors",
                element: <AllInstructorPage />
            },
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
               path: "admin",
                element: <AdminDashboard/>,
            },
            {
               path: "admin/manage-user",
                element: <ManageUsers/>,
            },
            {
               path: "admin/manage-classes",
                element: <ManageClasses/>,
            },
            
            {
                path: "user",
                element: <StudentDashboard/>,
            },
            {
                path: "user/my-classes",
                element: <MyClasses/>,
            },
            
            {
                path: "user/my-enrolled",
                element: <MyEnrolledClasses/>,
            },
            {
                path: "user/payment-history",
                element: <PaymentHistory/>,
            },
            {
                path: "instructor",
                element: <InstructorDashboard/>,
            },
            {
                path: "instructor/add-class",
                element: <AddClasses/>
            },
            
            {
                path: "instructor/my-classes",
                element: <InstructorCLasses/>,
            },
            

            
        ]
    },
    {
        path: "/secret",
        element:
            <Secret></Secret>

    }
])