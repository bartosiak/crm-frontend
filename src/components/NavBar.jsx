export const NavBar = () => {
    return (
        <nav class="navbar navbar-expand navbar-light">
            <div class="container">
                <a class="navbar-brand" href="/crm-front/">
                    CRM
                </a>
                <div class="me-auto navbar-nav">
                    <a class="nav-link" href="/crm-front/add-customer">
                        Dodaj klienta
                    </a>
                    <a class="nav-link" href="/crm-front/">
                        Logout
                    </a>
                </div>
            </div>
        </nav>
    );
};
