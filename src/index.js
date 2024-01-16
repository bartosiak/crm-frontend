import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CustomersList } from "./components/CustomersList";
import { CustomerDetail } from "./components/CustomerDetail";
import { AddCustomerForm } from "./components/AddCustomerForm";
import { createNewCustomer } from "./components/AddCustomerForm";
import { CustomerEdit } from "./components/CustomerEdit";
import { LoginForm } from "./components/LoginForm";
// import { PrivateRoute } from "./components/PrivateRoute";

const router = createBrowserRouter([
    {
        element: <App />,
        path: "/",
        children: [
            {
                path: "/customers",
                element: <CustomersList />,
            },
            {
                path: "/customers/:id",
                element: <CustomerDetail />,
            },
            {
                path: "/add-customer",
                action: createNewCustomer,
                element: <AddCustomerForm />,
            },
            {
                path: "/edit-customer/:id",
                element: <CustomerEdit />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginForm />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
