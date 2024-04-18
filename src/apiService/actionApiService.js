import Cookies from "js-cookie";
import { BACKEND_URL } from "../constants/api";

export const actionApiService = {
    list: async (customerId) => {
        try {
            const token = Cookies.get("token");
            const response = await fetch(
                `${BACKEND_URL}/actions?customer=${customerId}`,
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
            const token = Cookies.get("token");
            const response = fetch(`${BACKEND_URL}/actions`, {
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
            const token = Cookies.get("token");
            const response = await fetch(`${BACKEND_URL}/actions/${actionId}`, {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            });

            const action = await response.json();
            return action;
        } catch (error) {
            console.error("Error:", error);
        }
    },
    update: async (updatedAction) => {
        console.log(updatedAction);
        try {
            const token = Cookies.get("token");
            const response = await fetch(
                `${BACKEND_URL}/actions/${updatedAction._id}`,
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
