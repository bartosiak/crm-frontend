import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { actionApiService } from "../apiService/actionApiService";

function ActionCreateEditModal({
    handleClose,
    show,
    action,
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

    const updateAction = (updatedAction) => {
        actionApiService.update(updatedAction).then((action) => {
            setUpdatedAction(action);
            handleClose();
        });
    };

    const createAction = () => {
        const newAction = { ...updatedAction, customer: customerId };
        actionApiService.create(newAction).then(() => {
            handleClose();
        });
    };

    const handleSubmit = () => {
        if (isEditing) {
            updateAction(updatedAction);
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
                            defaultValue={action?.description}
                            onChange={handleInputChange}
                            rows="6"
                        />
                    </div>
                    <div className="mb-3 d-flex flex-column w-25">
                        <label htmlFor="type">Wybierz kontakt</label>
                        <select
                            name="type"
                            defaultValue={action?.type}
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
                        selected={new Date(updatedAction?.date)}
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
