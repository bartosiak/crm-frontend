import React from "react";
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
}) {
    console.log(action);
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Opis</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3 d-flex flex-column w-75 h-75">
                        <label htmlFor="description">Opis</label>
                        <textarea
                            name="description"
                            defaultValue={action.description}
                            rows="6"
                        />
                    </div>
                    <div className="mb-3 d-flex flex-column w-25">
                        <label htmlFor="type">Wybierz kontakt</label>
                        <select name="type" defaultValue={action.type}>
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
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyModal;
