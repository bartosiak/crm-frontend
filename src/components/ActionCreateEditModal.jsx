import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ActionCreateEditModal({
    handleClose,
    show,
    action,
    refreshActions,
    customerId,
    isEditing,
}) {
    const [updatedAction, setUpdatedAction] = useState(action);

    useEffect(() => {
        setUpdatedAction(action);
    }, [action, show]);

    const handleInputChange = (event) => {
        setUpdatedAction({
            ...updatedAction,
            [event.target.name]: event.target.value,
        });
    };

    const updateDate = (date) => {
        setUpdatedAction({ ...updatedAction, date: date.toISOString() });
    };

    const updateAction = () => {
        const token = Cookies.get("token"); 
        return fetch(`http://localhost:4000/actions/${updatedAction._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(updatedAction),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
            })
            .then(() => {
                handleClose();
                refreshActions();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const createAction = () => {
        const token = Cookies.get("token"); 
        const newAction = { ...updatedAction, customer: customerId };
        return fetch(`http://localhost:4000/actions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(newAction),
        }).then(() => {
            handleClose();
            refreshActions();
        });
    };

    const handleSubmit = () => {
        if (isEditing) {
            updateAction();
        } else {
            createAction();
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Opis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3 d-flex flex-column w-75 h-75">
                        <label htmlFor="description">Akcje</label>
                        <textarea
                            name="description"
                            defaultValue={action.description}
                            onChange={handleInputChange}
                            rows="6"
                        />
                    </div>
                    <div className="mb-3 d-flex flex-column w-25">
                        <label htmlFor="type">Wybierz kontakt</label>
                        <select
                            name="type"
                            defaultValue={action.type}
                            onChange={handleInputChange}
                        >
                            <option value="mail">email</option>
                            <option value="phone">telefon</option>
                            <option value="meeting">spotkanie</option>
                        </select>
                    </div>
                    <DatePicker
                        className="form-control form-control-sm"
                        showIcon
                        toggleCalendarOnIconClick
                        selected={new Date(updatedAction.date)}
                        onChange={updateDate}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Zamknij
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={handleSubmit}
                    >
                        Zapisz zmiany
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ActionCreateEditModal;
