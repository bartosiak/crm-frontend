export const loginApiService = {
    login: async (loginData) => {
        try {
            const response = await fetch("http://localhost:4000/login", {
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
            const response = await fetch("http://localhost:4000/signup", {
                method: "POST",
                body: JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                }),
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const signup = await response.json();
            return signup;
        } catch (error) {
            return error;
        }
    },
};
