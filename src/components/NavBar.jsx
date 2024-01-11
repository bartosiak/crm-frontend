import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand navbar-light">
            <div>
                <div className="me-auto navbar-nav">
                    <Link className="navbar-brand" to={"/customers"}>
                        CRM
                    </Link>
                    <Link className="nav-link" to={"/add-customer"}>
                        Dodaj klienta
                    </Link>
                    <Link className="nav-link" to={"/login"}>
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};
