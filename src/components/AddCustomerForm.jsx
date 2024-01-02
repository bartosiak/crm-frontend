import React, { useState } from "react";

export const AddCustomerForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        street: "",
        zipCode: "",
        city: "",
        nip: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Tu możesz obsługiwać wysłane dane
        console.log(formData);
    };

    return (
        <form className="w-50" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="name">
                    Nazwa klienta
                </label>
                <input
                    name="name"
                    placeholder="Nazwa klienta"
                    type="text"
                    id="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>
            {/* ... Pozostałe pola wejściowe analogicznie ... */}
            <div className="mb-3">
                <button type="submit" className="btn btn-primary">
                    Dodaj
                </button>
            </div>
        </form>
    );
};
