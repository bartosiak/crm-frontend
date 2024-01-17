import React from "react";
import "./Popup.css"; // Importuj plik CSS

const Popup = ({ onConfirm, onCancel }) => {
    return (
        <div className="popup-background">
            <div className="popup-content">
                <div>
                    <h3 className="question my-2">Chcesz usunąć klienta?</h3>
                </div>
                <div className="buttons">
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
