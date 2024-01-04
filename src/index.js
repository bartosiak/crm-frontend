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

const router = createBrowserRouter([
    {
        element: <App />,
        path: "/",
        children: [
            {
                path: "/customers",
                element: <CustomersList />,
                loader: () => {
                    return fetch("http://localhost:4000/customers");
                },
            },
            {
                path: "/customers/:id",
                element: <CustomerDetail />,
                loader: ({ params }) => {
                    return fetch(
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
                    return fetch(
                        `http://localhost:4000/customers/${params.id}`
                    );
                },
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
