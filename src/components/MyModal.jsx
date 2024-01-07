import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MyModal({
    handleShow,
    handleClose,
    show,
    action,
    selected,
    onChange,
    refreshActions,
}) {
    const [updatedAction, setUpdatedAction] = useState(action);

    useEffect(() => {
        setUpdatedAction(action);
    }, [action]);

    const handleInputChange = (event) => {
        setUpdatedAction({
            ...updatedAction,
            [event.target.name]: event.target.value,
        });
    };

    function updateAction() {
        console.log(updatedAction._id);
        return fetch(`http://localhost:4000/actions/${updatedAction._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAction),
        }).then(() => {
            handleClose();
            refreshActions();
        });
    }

    console.log(action);
    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Opis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3 d-flex flex-column w-75 h-75">
                        <label htmlFor="description">Opis</label>
                        <textarea
                            name="description"
                            defaultValue={updatedAction.description}
                            onChange={handleInputChange}
                            rows="6"
                        />
                    </div>
                    <div className="mb-3 d-flex flex-column w-25">
                        <label htmlFor="type">Wybierz kontakt</label>
                        <select
                            name="type"
                            defaultValue={updatedAction.type}
                            onChange={handleInputChange}
                        >
                            <option value="option1">email</option>
                            <option value="option2">telefon</option>
                            <option value="option3">spotkanie</option>
                        </select>
                    </div>
                    <DatePicker
                        className="form-control form-control-sm"
                        showIcon
                        toggleCalendarOnIconClick
                        selected={selected}
                        onChange={onChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        onClick={updateAction}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyModal;
