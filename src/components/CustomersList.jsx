import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { customerApiService } from "../apiService/customerApiService";
import Popup from "./Popup";

export const CustomersList = () => {
    const [customers, setCustomers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);

    const handleDeleteClick = (customerId) => {
        setCustomerToDelete(customerId);
        setShowPopup(true);
    };

    const handleConfirmDelete = () => {
        deleteCustomer(customerToDelete);
        setShowPopup(false);
    };

    useEffect(() => {
        customerApiService.list().then((customers) => {
            setCustomers(customers);
        });
    }, []);

    function deleteCustomer(customerId) {
        customerApiService.delete(customerId).then(() => {
            customerApiService.list().then((customers) => {
                setCustomers(customers);
            });
        });
    }

    return (
        <div>
            <h2>Klienci</h2>

            {customers.map((customer, index) => (
                <div className="card mb-3" key={customer._id}>
                    <div className="card-body">
                        <div className="card-title h5">{customer.name}</div>
                        <strong>Adres</strong>
                        <address>
                            {customer?.address.street}
                            <br />
                            {customer?.address.zipCode}
                            <br />
                            {customer?.address.city}
                            <br />
                        </address>
                        <p className="card-text">NIP: {customer?.nip}</p>
                        <div className="d-flex">
                            <Link
                                to={`/customers/${customer?._id}`}
                                className="btn btn-primary me-3"
                            >
                                Szczegóły
                            </Link>
                            <Link
                                to={`/edit-customer/${customer?._id}`}
                                className="btn btn-warning me-3"
                            >
                                Edycja
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteClick(customer._id)}
                            >
                                Usuń
                            </button>
                            {showPopup && (
                                <Popup
                                    title="Potwierdź usunięcie"
                                    message="Czy na pewno chcesz usunąć tego klienta?"
                                    onConfirm={handleConfirmDelete}
                                    onCancel={() => setShowPopup(false)}
                                />
                            )}
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
