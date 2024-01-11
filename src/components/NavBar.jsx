import { Link } from "react-router-dom";

export const NavBar = () => {
    const token = localStorage.getItem("token");
    const isAuth = !!token;

    return (
        <nav className="navbar navbar-expand navbar-light">
            <div>
                <div className="me-auto navbar-nav">
                    <Link className="navbar-brand" to={"/customers"}>
                        CRM
                    </Link>
                    {isAuth ? (
                        <Link className="nav-link" to={"/add-customer"}>
                            Dodaj klienta
                        </Link>
                    ) : (
                        ""
                    )}

                    {isAuth ? (
                        <Link
                            className="nav-link"
                            onClick={() => {
                                localStorage.removeItem("token");
                            }}
                            to={"/login"}
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link className="nav-link" to={"/login"}>
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};
