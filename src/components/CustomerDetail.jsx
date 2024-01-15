import { useLoaderData } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import ActionCreateEditModal from "./ActionCreateEditModal";
import Cookies from "js-cookie";

export const CustomerDetail = () => {
    const customer = useLoaderData();
    const customerId = customer._id;

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAction, setSelectedAction] = useState({
        customer: "",
        description: "",
        type: "",
        date: new Date(),
    });
    const [actions, setActions] = useState([]);

    useEffect(() => {
        fetchActions();
        // eslint-disable-next-line
    }, []);

    const fetchActions = () => {
        const token = Cookies.get("token");
        fetch(`http://localhost:4000/actions?customer=${customerId}`, {
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setActions(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleOpenEditModal = (action) => {
        setSelectedAction(action);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleOpenCreateModal = () => {
        setSelectedAction({
            customer: customerId,
            description: "",
            type: "mail",
            date: new Date(),
        });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleDeleteAction = (actionId) => {
        console.log(actionId);
        const token = Cookies.get("token");
        fetch(`http://localhost:4000/actions/${actionId._id}`, {
            method: "DELETE",
            headers: {
                Authorization: token,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else {
                    fetchActions();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
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
                            <td>
                                {new Date(action.date).toLocaleDateString()}
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleDeleteAction(action)}
                                >
                                    Usuń
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleOpenEditModal(action)}
                                >
                                    Edytuj
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                type="button"
                className="btn btn-primary"
                onClick={handleOpenCreateModal}
            >
                Dodaj akcje
            </button>

            <ActionCreateEditModal
                show={showModal}
                handleClose={handleCloseModal}
                action={selectedAction}
                refreshActions={fetchActions}
                customerId={customerId}
                isEditing={isEditing}
            />
        </div>
    );
};
