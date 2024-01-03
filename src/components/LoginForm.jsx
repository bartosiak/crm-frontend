export const LoginForm = () => {
    return (
        <form className="w-50 mx-auto">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Login
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Login"
                    className="form-control"
                    value=""
                    autoComplete="off"
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
                    value=""
                    autoComplete="off"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Zaloguj
            </button>
        </form>
    );
};
