import Cookies from "js-cookie";

const token = Cookies.get("token");

export const actionApiService = {
    list: async (customerId) => {
        try {
            const response = await fetch(
                `http://localhost:4000/actions?customer=${customerId}`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const actions = await response.json();
            return actions;
        } catch (error) {
            return error;
        }
    },
    create: async (updatedAction) => {
        try {
            const response = fetch("http://localhost:4000/actions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(updatedAction),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const actions = await response.json();
            return actions;
        } catch (error) {
            console.error("Error:", error);
        }
    },
    delete: async (actionId) => {
        try {
            const response = await fetch(
                `http://localhost:4000/actions/${actionId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: token,
                    },
                }
            );

            const action = await response.json();
            return action;
        } catch (error) {
            console.error("Error:", error);
        }
    },
    update: async (updatedAction) => {
        console.log(updatedAction);
        try {
            const response = await fetch(
                `http://localhost:4000/actions/${updatedAction._id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedAction),
                }
            );

            const customer = await response.json();
            return customer;
        } catch (error) {
            console.log(error);
        }
    },
};
