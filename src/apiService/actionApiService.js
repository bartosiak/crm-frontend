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
};
