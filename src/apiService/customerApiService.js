import Cookies from "js-cookie";

export const customerApiService = {
    list: async () => {
        try {
            const token = Cookies.get("token");
            const response = await fetch("http://localhost:4000/customers", {
                headers: {
                    Authorization: token,
                },
            });
            const customers = await response.json();
            return customers;
        } catch (error) {
            console.log(error);
        }
    },

    get: async (id) => {
        try {
            const token = Cookies.get("token");
            const response = await fetch(
                `http://localhost:4000/customers/${id}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const customer = await response.json();
            return customer;
        } catch (error) {
            return error;
        }
    },
    create: async (customerData) => {
        try {
            const token = Cookies.get("token");
            const response = await fetch(`http://localhost:4000/customers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(customerData),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const customer = await response.json();
            return customer;
        } catch (error) {
            console.log("err");
        }
    },

    delete: async (id) => {
        try {
            const token = Cookies.get("token");
            const response = await fetch(
                `http://localhost:4000/customers/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: token,
                    },
                }
            );
            const customer = await response.json();
            return customer;
        } catch (error) {
            console.log("err");
        }
    },
    update: async (id, data) => {
        try {
            const token = Cookies.get("token");
            const response = await fetch(
                `http://localhost:4000/customers/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const customer = await response.json();
            return customer;
        } catch (error) {
            console.log(error);
        }
    },
};
