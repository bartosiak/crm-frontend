import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import Cookies from "js-cookie";
import { loginApiService } from "../apiService/loginApiService";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sending fetch request with data:", { email, password });
        loginApiService
            .login({ email: email, password: password })
            .then((result) => {
                console.log(result);
                Cookies.set("token", result.jwt, { expires: 1/24 });
                navigate("/customers");
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
