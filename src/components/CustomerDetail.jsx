import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import ActionCreateEditModal from "./ActionCreateEditModal";
import { customerApiService } from "../apiService/customerApiService";
import { actionApiService } from "../apiService/actionApiService";

export const CustomerDetail = () => {
    const [customer, setCustomer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAction, setSelectedAction] = useState({
        customer: "",
        description: "",
        type: "",
        date: new Date(),
    });
    const [actions, setAction] = useState(null);
    const params = useParams();

    const customerId = customer?._id;

    useEffect(() => {
        customerApiService.get(params.id).then((customer) => {
            setCustomer(customer);
        });
        actionApiService.list(params.id).then((action) => {
            setAction(action);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isModalOpen) {
            actionApiService.list(params.id).then((action) => {
                setAction(action);
            });
        }
    }, [isModalOpen, params.id]);

    // useEffect(() => {
    //     fetchActions();
    //     // eslint-disable-next-line
    // }, []);

    // const fetchActions = () => {
    //     const token = Cookies.get("token");
    //     fetch(`http://localhost:4000/actions?customer=${customerId}`, {
    //         headers: {
    //             Authorization: token,
    //         },
    //     })
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setActions(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error:", error);
    //         });
    // };

    const handleOpenEditModal = (action) => {
        setSelectedAction(action);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const handleOpenCreateModal = () => {
        setSelectedAction({
            customer: customerId,
            description: "",
            type: "mail",
            date: new Date(),
        });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteAction = (action) => {
        actionApiService
            .delete(action._id)
            .then((deletedAction) => {
                console.log(deletedAction);
                actionApiService.list(params.id).then((action) => {
                    setAction(action);
                });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <div className="mb-5 card">
                <div className="card-body">
                    <div className="card-title h5">{customer?.name}</div>
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
                    {actions?.map((action, index) => (
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
                                    className="btn btn-primary mx-1"
                                    onClick={() => handleDeleteAction(action)}
                                >
                                    Usuń
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary mx-1"
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
                show={isModalOpen}
                handleClose={handleCloseModal}
                action={selectedAction}
                customerId={customerId}
                isEditing={isEditing}
            />
        </div>
    );
};
