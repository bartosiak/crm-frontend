import { BACKEND_URL } from "../constants/api";

export const loginApiService = {
    login: async (loginData) => {
        try {
            const response = await fetch(`${BACKEND_URL}/login`, {
                method: "POST",
                body: JSON.stringify({
                    email: loginData.email,
                    password: loginData.password,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const userData = await response.json();
            return userData;
        } catch (error) {
            return error;
        }
    },
    create: async (userData) => {
        try {
            const response = await fetch(`${BACKEND_URL}/signup`, {
                method: "POST",
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (response.status === 500) {
                throw new Error("Błąd 500");
            }
            if (!response.ok) {
                let error;
                if (response.status === 409) {
                    error = new Error(
                        "User already exists with the provided email address"
                    );
                } else {
                    error = new Error(`HTTP error! status: ${response.status}`);
                }
                error.status = response.status;
                throw error;
            }

            const signup = await response.json();
            return signup;
        } catch (error) {
            throw new Error(`HTTP error! status: ${error.status}`);
        }
    },
};
