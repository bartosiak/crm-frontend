import { useState } from "react";
import { NavBar } from "./NavBar";
import { useNavigate } from "react-router-dom";
import { loginApiService } from "../apiService/loginApiService";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [submitMessage, setSubmitMessage] = useState("");
    const navigate = useNavigate();

    const validateEmail = (value) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setEmailError(isValid ? "" : "Wprowadź prawidłowy adres e-mail");
        return isValid;
    };

    const validatePassword = (value) => {
        const isValid = value.length >= 4;
        setPasswordError(isValid ? "" : "Hasło musi mieć co najmniej 4 znaki");
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (isEmailValid && isPasswordValid) {
            loginApiService
                .create({
                    email: email,
                    password: password,
                })
                .then((result) => {
                    console.log(result);
                    if (result.error) {
                        setSubmitMessage(result.message);
                    } else {
                        setSubmitMessage("Rejestracja przebiegła pomyślnie");
                        setTimeout(() => {
                            navigate("/login");
                        }, 2000);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setSubmitMessage("Błąd serwera");
                });
        } else {
            setSubmitMessage(
                "Dane formularza są niepoprawne, zarejestruj się jeszcze raz"
            );
        }
    };

    return (
        <div className="container">
            <NavBar />
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <h3>Rejestracja w CRM</h3>
                    <p className="fs-5">
                        Aby założyć konto, wypełnij formularz
                    </p>
                    <label htmlFor="email" className="form-label">
                        Login
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="email"
                        className={`form-control ${
                            emailError ? "is-invalid" : ""
                        }`}
                        autoComplete="off"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            validateEmail(e.target.value);
                        }}
                        required
                    />
                    {emailError && (
                        <div className="invalid-feedback">{emailError}</div>
                    )}
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
                        className={`form-control ${
                            passwordError ? "is-invalid" : ""
                        }`}
                        autoComplete="off"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                    />
                    {passwordError && (
                        <div className="invalid-feedback">{passwordError}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Zarejestruj
                </button>
                {submitMessage !== "" ? (
                    <h5 className="mt-3">{submitMessage}</h5>
                ) : (
                    ""
                )}
            </form>
        </div>
    );
};
