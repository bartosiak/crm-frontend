import React, { useState } from "react";
import "./Popup.css"; // Importuj plik CSS

const Popup = ({ onClose }) => {
    const [selectedOption, setSelectedOption] = useState("");
    const [text, setText] = useState("");

    return (
        <div className="popup-background">
            <div className="popup-content">
                <h2 style={{ marginTop: 0 }}>My Popup</h2>
                <div className="mb-3">
                    <label htmlFor="description">Opis</label>
                    <textarea
                        name="description"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="type"></label>
                    <select
                        name="type"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="">Select...</option>
                        <option value="option1">email</option>
                        <option value="option2">telefon</option>
                        <option value="option3">spotkanie</option>
                    </select>
                </div>

                <button onClick={onClose} className="btn btn-primary">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Popup;
