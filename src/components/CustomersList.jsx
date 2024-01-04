import { Link, useLoaderData, useNavigate } from "react-router-dom";

export const CustomersList = ({ customers }) => {
    const navigate = useNavigate();

    const onDetailsClick = (customer) => {
        navigate(`/customers/${customer._id}`);
    };

    customers = useLoaderData();

    return (
        <div>
            <h2>Klienci</h2>

            {customers.map((customer, index) => (
                <div className="card mb-3" key={customer._id}>
                    <div className="card-body">
                        <div className="card-title h5">{customer.name}</div>
                        <strong>Adres</strong>
                        <address>
                            {customer.address.street}
                            <br />
                            {customer.address.zipCode}
                            <br />
                            {customer.address.city}
                            <br />
                        </address>
                        <p className="card-text">NIP: {customer.nip}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => onDetailsClick(customer)}
                        >
                            Szczegóły
                        </button>
                    </div>
                </div>
            ))}
            <Link to={"/add-customer"}>
                <button className="btn btn-success">Dodaj Klienta</button>
            </Link>
        </div>
    );
};
