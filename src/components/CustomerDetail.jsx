import { Form, redirect, useLoaderData } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import MyModal from "./MyModal";

export function deleteCustomer({ params }) {
    return fetch(`http://localhost:4000/customers/${params.id}`, {
        method: "DELETE",
    }).then(() => {
        return redirect("/customers");
    });
}

export const CustomerDetail = () => {
    const customer = useLoaderData();

    const [showModal, setShowModal] = useState(false);
    const [selectedAction, setSelectedAction] = useState({
        description: "",
        type: "",
        date: "",
    });
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [actions, setActions] = useState([]);

    useEffect(() => {
        fetchActions();
    }, []);

    const fetchActions = () => {
        fetch(`http://localhost:4000/actions?customerId=${customer._id}`)
            .then((response) => response.json())
            .then((data) => setActions(data))
            .catch((error) => console.error("Error:", error));
    };

    const handleOpenModal = (action) => {
        setSelectedAction(action);
        setShowModal(true);
    };
    console.log(selectedAction);
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="mb-5 card">
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
                    <Form method="DELETE" action="delete">
                        <button className="btn btn-danger">Usuń</button>
                    </Form>
                </div>
            </div>
            <h2>Akcje</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>LP.</th>
                        <th>Opis</th>
                        <th>Rodzaj akcji</th>
                        <th>Data</th>
                        <th>Edycja</th>
                    </tr>
                </thead>
                <tbody>
                    {actions.map((action, index) => (
                        <tr key={index}>
                            <td>{index + 1}.</td>
                            <td>{action.description}</td>
                            <td>{action.type}</td>
                            <td>{action.date}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                >
                                    Usuń
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleOpenModal(action)}
                                >
                                    Edytuj
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button type="button" className="btn btn-primary">
                Dodaj akcje
            </button>
            <MyModal
                show={showModal}
                handleClose={handleCloseModal}
                action={selectedAction}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                refreshActions={fetchActions}
            />
        </div>
    );
};
