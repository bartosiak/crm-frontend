import { Form, Link, redirect, useLoaderData } from "react-router-dom";



export const CustomersList = ({ customers }) => {
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
                        <div className="d-flex">
                            <Link
                                to={`/customers/${customer._id}`}
                                className="btn btn-primary me-3"
                            >
                                Szczegóły
                            </Link>
                            <Link
                                to={`/edit-customer/${customer._id}`}
                                className="btn btn-warning me-3"
                            >
                                Edycja
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            <Link to={"/add-customer"}>
                <button className="btn btn-success">Dodaj Klienta</button>
            </Link>
        </div>
    );
};
