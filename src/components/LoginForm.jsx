import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import Cookies from "js-cookie";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = (email, password) => {
        console.log("Sending fetch request with data:", { email, password });

        return fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    console.error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log(result);
                Cookies.set("token", result.jwt);
                return result;
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(email, password).then((result) => {
            if (result) {
                navigate("/customers");
            }
        });
    };

    return (
        <div className="container">
            <NavBar />
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Login
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="email"
                        className="form-control"
                        autoComplete="off"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Hasło
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Hasło"
                        className="form-control"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Zaloguj
                </button>
            </form>
        </div>
    );
};
