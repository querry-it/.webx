import type { RouteObject } from "react-router-dom";
import axios from "axios";
import App from "../App";
import Login from "../pages/login";
import ForgotPassword from "../pages/forgot-password";
import Register from "../pages/register";
import ResetPassword from "../pages/reset-password";
import NotFound from "../pages/not-found";
import Dashboard from "../pages/dashboard";

const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Login /> },

            {
                path: "forgot-password",
                loader: async () => {
                    try {
                        await axios.get(
                            "http://localhost:5000/auth/can-access-forgot",
                            { withCredentials: true }
                        );
                        return null;
                    } catch {
                        throw new Response("Not Found", { status: 404 });
                    }
                },
                element: <ForgotPassword />,
                errorElement: <NotFound />,
            },
            {
                path: "register",
                loader: async () => {
                    try {
                        await axios.get(
                            "http://localhost:5000/auth/can-access-register",
                            { withCredentials: true }
                        );
                        return null;
                    } catch {
                        throw new Response("Not Found", { status: 404 });
                    }
                },
                element: <Register />,
                errorElement: <NotFound />,
            },
            {
                path: "reset-password",
                loader: async () => {
                    try {
                        await axios.get(
                            "http://localhost:5000/auth/can-access-reset",
                            { withCredentials: true }
                        );
                        return null;
                    } catch {
                        throw new Response("Not Found", { status: 404 });
                    }
                },
                element: <ResetPassword />,
                errorElement: <NotFound />,
            },
            { path: "home", element: <Dashboard /> },
            { path: "*", element: <NotFound /> },
        ],
    },
];

export default publicRoutes;
