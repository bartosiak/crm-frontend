import React from "react";
import "./Popup.css";

const Popup = ({ onConfirm, onCancel, title, message }) => {
    return (
        <div className="popup-background">
            <div className="popup-content p-3">
                <div>
                    <h3 className="question ">{title}</h3>
                </div>
                <div className="my-2 fs-5">{message}</div>
                <div className="buttons mt-2">
                    <button onClick={onCancel} className="btn btn-danger mx-2">
                        NIE
                    </button>
                    <button
                        onClick={onConfirm}
                        className="btn btn-success mx-2"
                    >
                        TAK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
