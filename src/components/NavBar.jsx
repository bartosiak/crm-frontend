import Cookies from "js-cookie";
import { Link } from "react-router-dom";

export const NavBar = () => {
    const token = Cookies.get("token");
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
                        <Link className="nav-link" to={"/signup"}>
                            Signup
                        </Link>
                    )}

                    {isAuth ? (
                        <Link
                            className="nav-link"
                            onClick={() => {
                                Cookies.remove("token");
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
