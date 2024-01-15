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
import { CustomerEdit, updateCustomer } from "./components/CustomerEdit";
import { LoginForm } from "./components/LoginForm";
import { PrivateRoute } from "./components/PrivateRoute";
import Cookies from "js-cookie";

const fetchData = (url) => {
    const token = Cookies.get("token");
    console.log(token);
    return fetch(url, {
        headers: {
            Authorization: token,
        },
    });
};

const router = createBrowserRouter([
    {
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
        path: "/",
        children: [
            {
                path: "/customers",
                element: <CustomersList />,
                loader: () => {
                    return fetchData("http://localhost:4000/customers");
                },
            },
            {
                path: "/customers/:id",
                element: <CustomerDetail />,
                loader: ({ params }) => {
                    return fetchData(
                        `http://localhost:4000/customers/${params.id}`
                    );
                },
            },
            {
                path: "/add-customer",
                action: createNewCustomer,
                element: <AddCustomerForm />,
            },
            {
                path: "/edit-customer/:id",
                element: <CustomerEdit />,
                action: updateCustomer,
                loader: ({ params }) => {
                    return fetchData(
                        `http://localhost:4000/customers/${params.id}`
                    );
                },
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
